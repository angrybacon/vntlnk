'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { COLUMNS, QUERY_PATTERN } from '~/modules/PoisonDartFrog/constants';
import { type Line } from '~/modules/PoisonDartFrog/models';
import { Parsed } from '~/modules/PoisonDartFrog/Parsed';
import { Results } from '~/modules/PoisonDartFrog/Results';
import { Upload } from '~/modules/PoisonDartFrog/Upload';

type Row = [id: number, data: string[]];

export const PoisonDartFrog = () => {
  const [columns, setColumns] = useState<typeof COLUMNS>([]);
  const [confidence, setConfidence] = useState(0);
  const [lines, setLines] = useState<Line[]>();
  const [query, setQuery] = useState(QUERY_PATTERN);
  const [pattern, setPattern] = useState<RegExp>();
  const [patternError, setPatternError] = useState<string>();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    try {
      setPattern(new RegExp(query));
      setPatternError(undefined);
    } catch (error) {
      setPattern(undefined);
      setPatternError(error instanceof Error ? error.message : `${error}`);
    }
  }, [query]);

  useEffect(() => {
    if (pattern && lines) {
      const candidates = lines.reduce<Row[]>((accumulator, { text }, index) => {
        const [, ...matches] = text.match(pattern) || [];
        if (matches.length) {
          // TODO How about color-coded confidence for each value?
          accumulator.push([index, matches]);
        }
        return accumulator;
      }, []);
      setRows(candidates);
    }
  }, [lines, pattern]);

  useEffect(() => {
    if (rows.some((row) => row.length !== rows[0]?.length)) {
      // TODO Handle more gracefully
      console.error('Some rows have more cells than others');
    }
    if (!rows[0]?.[1].length) {
      setColumns([]);
      return;
    }
    setColumns(
      rows[0][1].map((_, index) => [
        String.fromCharCode(65 + index),
        COLUMNS[index]?.[1] || false,
      ]),
    );
  }, [rows]);

  const onFilter = (index: number, value: boolean) =>
    setColumns((previous) => {
      const next = [...previous];
      if (next[index] !== undefined) {
        next[index][1] = value;
      }
      return next;
    });

  const onRead = (context: { confidence: number; lines: Line[] }) => {
    setConfidence(context.confidence);
    setLines(context.lines.filter(({ text }) => !!text.length));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
      <Upload onRead={onRead} sx={{ flexGrow: 1 }} />
      {lines && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Parsed
            confidence={confidence}
            lines={lines}
            onQuery={setQuery}
            pattern={pattern}
            patternError={patternError}
            query={query}
            sx={{ flexBasis: 0, flexGrow: 1 }}
          />
          <Results
            columns={columns}
            onFilter={onFilter}
            rows={rows}
            sx={{ flexBasis: 0, flexGrow: 1, minWidth: 420 }}
          />
        </Box>
      )}
    </Box>
  );
};
