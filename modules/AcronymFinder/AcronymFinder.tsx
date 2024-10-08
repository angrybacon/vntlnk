'use client';

import { Box, Grid2 as Grid, TextField, Typography } from '@mui/material';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ElementRef,
} from 'react';

import { Link } from '~/components/Link';
import { TextFieldWithReset } from '~/components/TextFieldWithReset';
import { useProgress } from '~/hooks/useProgress';
import { useStateSafe } from '~/hooks/useStateSafe';
import { Card } from '~/modules/AcronymFinder/Card';
import { Help } from '~/modules/AcronymFinder/Help';
import {
  scry,
  type Card as CardModel,
  type Warning,
} from '~/modules/AcronymFinder/scry';

const DEFAULT_FILTER = 'prefer:oldest -s:lea f:legacy';
const IMAGE_HEIGHT = 204;
const IMAGE_WIDTH = 146;

export const AcronymFinder = () => {
  const { setIsLoading } = useProgress();
  const inputRoot = useRef<ElementRef<'input'>>();
  const [cards, setCards] = useState<CardModel[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [filter, setFilter, filterSafe] = useStateSafe(DEFAULT_FILTER);
  const [query, setQuery, querySafe] = useStateSafe('');
  const [warnings, setWarnings] = useState<Warning[]>([]);

  useEffect(() => {
    let should = true;
    if (querySafe.length > 0) {
      setIsLoading(true);
      scry({ extra: filterSafe, query: querySafe }).then((response) => {
        if (should) {
          setError(null);
          setWarnings(response.warnings);
          if (response.object === 'list') {
            // TODO Handle pagination
            setCards(response.data.slice(0, 99));
            inputRoot.current?.blur();
          } else if (response.object === 'error') {
            setCards([]);
            setError(response.details);
          }
        }
        setIsLoading(false);
      });
    }
    return () => {
      should = false;
    };
  }, [filterSafe, querySafe]);

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
      {cards.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, sm: 3 },
            gridAutoRows: 'min-content',
            gridTemplateColumns: `repeat(auto-fill, minmax(${IMAGE_WIDTH}px, 1fr))`,
          }}
        >
          {cards.map((card) => (
            <Card
              card={card}
              height={IMAGE_HEIGHT}
              key={card.id}
              width={IMAGE_WIDTH}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
