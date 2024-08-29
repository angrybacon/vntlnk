'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { COLUMNS, QUERY_PATTERN } from '~/modules/PoisonDartFrog/constants';
import { Filters } from '~/modules/PoisonDartFrog/Filters';
import { Parsed } from '~/modules/PoisonDartFrog/Parsed';
import { Results } from '~/modules/PoisonDartFrog/Results';
import { Upload } from '~/modules/PoisonDartFrog/Upload';

import MOCKS from './mocks.json';

// TODO Find the actual statistic names
type Row = {
  id: number;
  mga: string;
  pg: string;
  pga: string;
  player: string;
  rank: string;
  score: string;
};

export const PoisonDartFrog = () => {
  const [columns, setColumns] = useState(COLUMNS);
  const [confidence, setConfidence] = useState<number>();
  const [lines, setLines] = useState<{ id: number; text: string }[]>(MOCKS);
  const [query, setQuery] = useState(QUERY_PATTERN);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    // TODO Handle filter syntax errors
    if (lines) {
      const candidates = lines.reduce<Row[]>((accumulator, { text }, index) => {
        const [, rank, player, score, mga, pg, pga] =
          text.match(new RegExp(query)) || [];
        // TODO Dry it up
        if (mga && pg && pga && player && rank && score) {
          // TODO How about color-coded confidence for each value?
          accumulator.push({ id: index, mga, pg, pga, player, rank, score });
        }
        return accumulator;
      }, []);
      setRows(candidates);
    }
  }, [query, lines]);

  const onFilter = (filter: keyof typeof columns, value: boolean) =>
    setColumns((previous) => ({ ...previous, [filter]: value }));

  const onRead = (context: {
    confidence: number;
    lines: { id: number; text: string }[];
  }) => {
    setConfidence(context.confidence);
    setLines(context.lines.filter(({ text }) => !!text.length));
  };

  // TODO Allow resetting the data
  const onReset = () => {};

  return (
    <Box
      sx={{
        alignItems: 'start',
        display: 'grid',
        gap: 3,
        gridTemplateAreas: "'upload upload' 'filters parsed' 'results parsed'",
      }}
    >
      <Upload onRead={onRead} sx={{ gridArea: 'upload' }} />
      {lines && (
        <>
          <Filters
            onFilter={onFilter}
            onQuery={setQuery}
            columns={columns}
            query={query}
            sx={{ gridArea: 'filters' }}
          />
          <Results rows={rows} sx={{ gridArea: 'results' }} />
          <Parsed
            confidence={confidence}
            lines={lines}
            sx={{ gridArea: 'parsed' }}
          />
        </>
      )}
      {!lines && (
        <Typography
          paragraph
          sx={{ color: 'text.secondary', fontStyle: 'italic' }}
        >
          Once you've uploaded a document you'll see extracted rows.
        </Typography>
      )}
    </Box>
  );
};
