'use client';

import { Box, Grid2 as Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState, type ChangeEvent } from 'react';

import { Link } from '~/components/Link';
import { useDebounce } from '~/hooks/useDebounce';
import { scry, type Card } from '~/modules/AcronymFinder/scry';

const DEFAULT_FILTER = 'prefer:oldest format:legacy';
const IMAGE_HEIGHT = 204;
const IMAGE_WIDTH = 146;

export const AcronymFinder = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [filter, setFilter, filterSafe] = useDebounce(DEFAULT_FILTER);
  const [input, setInput, inputSafe] = useDebounce('');

  useEffect(() => {
    let should = true;
    if (inputSafe.length > 0) {
      scry({ extra: filterSafe, query: inputSafe }).then((response) => {
        if (should) {
          setError(null);
          setWarnings(response.warnings || []);
          if (response.object === 'list') {
            setCards(response.data);
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
  }, [filterSafe, inputSafe]);

  const onFilter = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFilter(target.value);

  const onInput = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setInput(target.value.toLocaleUpperCase().trim());

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 4, md: 2 }}>
        <TextField
          autoFocus
          fullWidth
          helperText="Search for cards that match an acronym"
          label="Your acronym"
          onChange={onInput}
          size="small"
          value={input}
        />
      </Grid>
      <Grid size={{ xs: 8, md: 10 }}>
        <TextField
          fullWidth
          helperText={
            <>
              Narrow results using the{' '}
              <Link href="https://scryfall.com/docs/syntax">
                Scryfall syntax
              </Link>
            </>
          }
          label="Scryfall query"
          onChange={onFilter}
          value={filter}
          size="small"
          sx={{ input: { fontFamily: 'monospace' } }}
        />
      </Grid>
      {error && (
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h4">
            No cards found
          </Typography>
          <Typography color="text.secondary">
            <em>{error}</em>
          </Typography>
        </Grid>
      )}
      {warnings.length > 0 && (
        <Grid size={12} sx={{ textAlign: 'center' }}>
          {warnings.map((warning, index) => (
            // TODO Prefer unique IDs over indexes
            <Typography color="text.secondary" key={index}>
              <em>{warning}</em>
            </Typography>
          ))}
        </Grid>
      )}
      <Grid
        size={12}
        sx={{
          display: 'grid',
          gap: 2,
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
    </Grid>
  );
};
