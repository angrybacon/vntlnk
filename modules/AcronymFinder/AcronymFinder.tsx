'use client';

import { Box, Grid, TextField, Typography } from '@mui/material';
import {
  useCallback,
  useEffect,
  useRef,
  type ChangeEvent,
  type ComponentRef,
} from 'react';

import { Link } from '~/components/Link';
import { TextFieldWithReset } from '~/components/TextFieldWithReset';
import { useProgress } from '~/hooks/useProgress';
import { useStateSafe } from '~/hooks/useStateSafe';
import { Help } from '~/modules/AcronymFinder/Help';
import { MemoizedResults } from '~/modules/AcronymFinder/Results';
import { useScry } from '~/modules/Scry/useScry';

const DEFAULT_FILTER = 'prefer:oldest -s:lea f:legacy';

export const AcronymFinder = () => {
  const { setIsLoading } = useProgress();
  const inputRoot = useRef<ComponentRef<'input'>>(null);
  const [filter, setFilter, filterSafe] = useStateSafe(DEFAULT_FILTER);
  const [query, setQuery, querySafe] = useStateSafe('');

  const getQuery = useCallback(() => {
    const pattern = querySafe.split('').map((c) => `\\b${c}[^-\\s]*`);
    return pattern.length
      ? `name:\/^${pattern.join('([-\\s]| \\/\\/ )')}$\/`
      : '';
  }, [querySafe]);

  const { cards, error, isLoading, warnings } = useScry({
    extra: filterSafe,
    order: 'color',
    query: getQuery,
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const onFilter = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFilter(target.value);

  const onFilterReset = () => setFilter(DEFAULT_FILTER);

  const onInput = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setQuery(target.value.toLocaleUpperCase().trim());

  return (
    <Box
      sx={{
        display: 'grid',
        flexGrow: 1,
        gap: { xs: 2, sm: 3 },
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ pt: 1 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            autoFocus
            fullWidth
            helperText="Search for cards that match an acronym"
            inputRef={inputRoot}
            label="Your acronym"
            onChange={onInput}
            size="small"
            spellCheck="false"
            sx={{ gridArea: 'input' }}
            value={query}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <TextFieldWithReset
            errors={warnings}
            fullWidth
            helperText={
              <>
                Narrow results using the{' '}
                <Link href="https://scryfall.com/docs/syntax">
                  Scryfall syntax
                </Link>
              </>
            }
            isDirty={filterSafe !== DEFAULT_FILTER}
            label="Scryfall query"
            onChange={onFilter}
            onReset={onFilterReset}
            size="small"
            spellCheck="false"
            sx={{ gridArea: 'filter', input: { fontFamily: 'monospace' } }}
            value={filter}
          />
        </Grid>
      </Grid>
      {error && (
        <Box sx={{ m: { sm: 'auto' }, textAlign: 'center' }}>
          <Typography component="p" gutterBottom variant="h2">
            No cards found
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {error}
          </Typography>
        </Box>
      )}
      {!error && !cards.length && <Help sx={{ m: { sm: 'auto' } }} />}
      {cards.length > 0 && <MemoizedResults cards={cards} />}
    </Box>
  );
};
