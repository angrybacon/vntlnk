'use client';

import { Box, Grid2 as Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState, type ChangeEvent } from 'react';

import { Link } from '~/components/Link';
import { TextFieldWithReset } from '~/components/TextFieldWithReset';
import { useDebounce } from '~/hooks/useDebounce';
import { scry, type Card, type Warning } from '~/modules/AcronymFinder/scry';

const DEFAULT_FILTER = 'prefer:oldest format:legacy';
const IMAGE_HEIGHT = 204;
const IMAGE_WIDTH = 146;

export const AcronymFinder = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [filter, setFilter, filterSafe] = useDebounce(DEFAULT_FILTER);
  const [query, setQuery, querySafe] = useDebounce('');
  const [warnings, setWarnings] = useState<Warning[]>([]);

  useEffect(() => {
    let should = true;
    if (querySafe.length > 0) {
      scry({ extra: filterSafe, query: querySafe }).then((response) => {
        if (should) {
          setError(null);
          setWarnings(response.warnings);
          if (response.object === 'list') {
            // TODO Handle pagination
            setCards(response.data.slice(0, 99));
          } else if (response.object === 'error') {
            setCards([]);
            setError(response.details);
          }
        }
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
    <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ pt: 1 }}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          autoFocus
          fullWidth
          helperText="Search for cards that match an acronym"
          label="Your acronym"
          onChange={onInput}
          size="small"
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
          value={filter}
          size="small"
          sx={{ input: { fontFamily: 'monospace' } }}
        />
      </Grid>
      {error && (
        <Grid size={12} sx={{ mt: 4, textAlign: 'center' }}>
          <Typography component="p" gutterBottom variant="h2">
            No cards found
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {error}
          </Typography>
        </Grid>
      )}
      {cards.length > 0 && (
        <Grid
          size={12}
          sx={{
            display: 'grid',
            gap: { xs: 2, sm: 3 },
            gridTemplateColumns: `repeat(auto-fill, minmax(${IMAGE_WIDTH}px, 1fr))`,
          }}
        >
          {cards.map((card) => (
            <Box
              key={card.id}
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                img: { display: 'block', height: 'auto', width: '100%' },
                overflow: 'clip',
              }}
            >
              {card.image_uris ? (
                <Image
                  alt={card.name}
                  height={IMAGE_HEIGHT}
                  src={card.image_uris.small}
                  width={IMAGE_WIDTH}
                />
              ) : (
                'N/A'
              )}
            </Box>
          ))}
        </Grid>
      )}
    </Grid>
  );
};
