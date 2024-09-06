'use client';

import {
  getDocument,
  GlobalWorkerOptions,
  version,
  type PDFPageProxy,
  // NOTE Use legacy build until Node 22
} from 'pdfjs-dist/legacy/build/pdf';
import { createWorker } from 'tesseract.js';

import { type Line } from '~/modules/PoisonDartFrog/models';

// NOTE Until I figure out how to make Next transpile the dependency directly,
//      we're stuck with Unpkg.
GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

const scan = async (
  page: PDFPageProxy,
): Promise<{ confidence: number; lines: Line[] }> => {
  const viewport = page.getViewport({ scale: 1 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not guess 2D context for dummy canvas');
  }
  // NOTE Use a larger scale to increase confidence with the OCR results
  canvas.width = 1600;
  const scale = canvas.width / viewport.width;
  canvas.height = scale * viewport.height;
  await page.render({
    canvasContext: context,
    viewport: page.getViewport({ scale }),
  }).promise;
  const image = canvas.toDataURL('image/jpeg');
  console.info('Spawning an OCR worker...');
  const worker = await createWorker();
  const { data } = await worker.recognize(image);
  await worker.terminate();
  console.info('Successfully killed the worker');
  return {
    confidence: Math.round(data.confidence * 100) / 100,
    lines: data.lines.map((line, index) => ({
      confidence: Math.round(line.confidence * 100) / 100,
      id: index,
      text: line.text.replaceAll('\n', ''),
      words: line.words.map((word, index) => ({
        confidence: Math.round(word.confidence * 100) / 100,
        id: index,
        text: word.text,
      })),
    })),
  };
};

export const read = async (file: File, logger: (text: string) => void) => {
  const pdf = await getDocument(URL.createObjectURL(file)).promise;
  // TODO Handle multiple pages
  const page = await pdf.getPage(1);
  // TODO Retrieve `page` and `meta` concurrently
  const meta = await pdf.getMetadata();
  const text = await page.getTextContent();
  let confidence = 0;
  let lines: Line[] = [];
  if (text.items.length) {
    logger(`Found ${text.items.length} text nodes`);
    confidence = 100;
    lines = text.items.map((item, index) => {
      const text = 'str' in item ? item.str.trim() : '';
      return {
        confidence: 100,
        id: index,
        text,
        words: [{ confidence: 100, id: 0, text }],
      };
    });
  } else {
    logger('Found no text nodes, spawning an OCR worker...');
    ({ confidence, lines } = await scan(page));
    logger(`Scanned ${lines.length} lines with ${confidence}% confidence`);
  }
  return {
    confidence,
    lines,
    meta: { ...meta.info } as Record<string, unknown>,
  };
};
