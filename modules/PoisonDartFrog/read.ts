'use client';

import {
  getDocument,
  GlobalWorkerOptions,
  type PDFPageProxy,
} from 'pdfjs-dist/legacy/build/pdf';
import { createWorker } from 'tesseract.js';

import { type Line } from '~/modules/PoisonDartFrog/models';

const url = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url);
GlobalWorkerOptions.workerSrc = url.toString();

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

export const read = async (file: File) => {
  const pdf = await getDocument(URL.createObjectURL(file)).promise;
  // TODO Handle multiple pages
  const page = await pdf.getPage(1);
  // TODO Retrieve `page` and `meta` concurrently
  const meta = await pdf.getMetadata();
  const text = await page.getTextContent();
  let confidence = 0;
  let lines: Line[] = [];
  if (text.items.length) {
    console.info(`Found ${text.items.length} text nodes`);
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
    console.info('Found no text nodes, spawning a dummy canvas...');
    ({ confidence, lines } = await scan(page));
  }
  return {
    confidence,
    lines,
    meta: { ...meta.info } as Record<string, unknown>,
  };
};
