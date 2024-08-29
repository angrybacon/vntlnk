'use client';

import {
  getDocument,
  GlobalWorkerOptions,
  type PDFPageProxy,
} from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';

// TODO Handle invalid URLs
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const scan = async (page: PDFPageProxy) => {
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
    confidence: data.confidence,
    lines: data.lines.map((line, index) => ({
      id: index,
      text: line.text.replaceAll('\n', ''),
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
  let lines = [];
  if (text.items.length) {
    console.info(`Found ${text.items.length} text nodes`);
    confidence = 100;
    lines = text.items.map((item, index) => ({
      id: index,
      text: 'str' in item ? item.str.trim() : '',
    }));
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
