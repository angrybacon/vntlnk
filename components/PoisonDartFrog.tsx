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
  // TODO Handle multiple pages
  const page = await pdf.getPage(1);
  // TODO Retrieve `page` and `meta` concurrently
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

// TODO Find the actual statistic names
type Filtered = {
  id: number;
  mga: string;
  pg: string;
  pga: string;
  player: string;
  rank: string;
  score: string;
};

type Line = { id: number; text: string };

const FILTER_PATTERN = '^(\\d+) (.+) (\\d+) (\\d+) (\\d+) (\\d+)$';

export const PoisonDartFrog = () => {
  const [confidence, setConfidence] = useState<number>();
  const [filter, setFilter] = useState(FILTER_PATTERN);
  const [filtered, setFiltered] = useState<Filtered[]>([]);
  const [lines, setLines] = useState<Line[]>();

  useEffect(() => {
    // TODO Handle filter syntax errors
    if (lines) {
      const candidates = lines.reduce<Filtered[]>(
        (accumulator, { text }, index) => {
          const [, rank, player, score, mga, pg, pga] =
            text.match(new RegExp(filter)) || [];
          // TODO Dry it up
          if (mga && pg && pga && player && rank && score) {
            // TODO How about color-coded confidence for each value?
            accumulator.push({ id: index, mga, pg, pga, player, rank, score });
          }
          return accumulator;
        },
        [],
      );
      setFiltered(candidates);
    }
  }, [filter, lines]);

  // TODO Allow resetting the data
  const _onReset = () => {};

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files?.[0]) {
      // TODO Handle more gracefully
      throw new Error('No file found');
    }
    read(files[0]).then(({ confidence, items }) => {
      setConfidence(confidence);
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
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ id, player, rank, score }) => (
                  <tr key={id}>
                    <td>{rank}</td>
                    <td>{player}</td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.parsed}>
            Parsed {confidence !== undefined && `(confidence: ${confidence}%)`}
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
