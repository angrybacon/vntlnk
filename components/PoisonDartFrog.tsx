'use client';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { useEffect, useState, type ChangeEvent } from 'react';
import { createWorker } from 'tesseract.js';

import styles from './PoisonDartFrog.module.scss';

// TODO Handle invalid URLs
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const read = async (
  file: File,
): Promise<{
  confidence: number;
  items: { id: number; text: string }[];
  // NOTE Probably should be `Record<string, unknown>` instead
  meta: Object;
}> => {
  const pdf = await getDocument(URL.createObjectURL(file)).promise;
  // TODO How about multiple pages?
  const page = await pdf.getPage(1);
  const meta = await pdf.getMetadata();
  const text = await page.getTextContent();
  if (text.items.length) {
    console.info(`Found ${text.items.length} text nodes`);
    console.table(text.items);
    return {
      confidence: 100,
      items: text.items.map((item, index) => ({
        id: index,
        text: 'str' in item ? item.str.trim() : '',
      })),
      meta: meta.info,
    };
  }
  console.info('Found no text nodes, spawning a dummy canvas...');
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
    items: data.lines.map((line, index) => ({
      id: index,
      text: line.text.replaceAll('\n', ''),
    })),
    meta,
  };
};

type Filtered = {
  mga: string;
  pg: string;
  pga: string;
  player: string;
  rank: string;
};

type Line = { id: number; text: string };

const FILTER_PATTERN = '^(\\d+) (.+) (\\d+) (\\d+) (\\d+) (\\d+)$';

export const PoisonDartFrog = () => {
  const [filter, setFilter] = useState(FILTER_PATTERN);
  const [filtered, setFiltered] = useState<Filtered[]>([]);
  const [lines, setLines] = useState<Line[]>();

  useEffect(() => {
    if (lines) {
      const candidates = lines.reduce<Filtered[]>((accumulator, { text }) => {
        const [, rank, player, mga, pg, pga] =
          text.match(new RegExp(filter)) || [];
        if (mga && pg && pga && player && rank) {
          accumulator.push({ mga, pg, pga, player, rank });
        }
        return accumulator;
      }, []);
      setFiltered(candidates);
    }
  }, [filter, lines]);

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files?.[0]) {
      // TODO Handle more gracefully
      throw new Error('No file found');
    }
    read(files[0]).then(({ items }) => {
      setLines(items.filter((item) => !!item.text.length));
    });
  };

  return (
    <div className={styles.root}>
      <input
        accept="application/pdf"
        className={styles.input}
        onChange={onUpload}
        type="file"
      />
      {lines && (
        <>
          <input
            className={styles.filter}
            onChange={({ target }) => setFilter(target.value)}
            type="text"
            value={filter}
          />
          <div className={styles.results}>
            Results ({filtered.length})
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>MGA</th>
                  <th>PG</th>
                  <th>PGA</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ mga, pg, pga, player, rank }) => (
                  <tr key={`${rank} ${player}`}>
                    <td>{rank}</td>
                    <td>{player}</td>
                    <td>{mga}</td>
                    <td>{pg}</td>
                    <td>{pga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.parsed}>
            Parsed
            <pre>{lines.map(({ text }) => text).join('\n')}</pre>
          </div>
        </>
      )}
      {!lines && (
        <p>
          <em>
            Once you've uploaded a document you'll see parsed content below.
          </em>
        </p>
      )}
    </div>
  );
};
