'use client';

import { Box, Grid2 as Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useDebounce } from '~/hooks/useDebounce';
import { scry, type Card } from '~/modules/AcronymFinder/scry';

const INPUT_DELAY = 300;
const IMAGE_HEIGHT = 204;
const IMAGE_WIDTH = 146;

export const AcronymFinder = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [filter, setFilter] = useState('prefer:oldest format:legacy');
  const [input, setInput] = useState('');
  const debouncedFilter = useDebounce(filter, INPUT_DELAY).trim();
  const debouncedInput = useDebounce(input, INPUT_DELAY).trim();

  useEffect(() => {
    let should = true;
    if (debouncedInput.length > 0) {
      scry({ extra: debouncedFilter, query: debouncedInput }).then(
        (response) => {
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
        },
      );
    }
    return () => {
      should = false;
    };
  }, [debouncedFilter, debouncedInput]);

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <TextField
          autoFocus
          fullWidth
          helperText="Search for cards that match an acronym"
          label="Your acronym"
          onChange={({ target }) =>
            setInput(target.value.toLocaleUpperCase().trim())
          }
          value={input}
        />
      </Grid>
      <Grid size={8}>
        <TextField
          fullWidth
          helperText="Narrow results using the Scryfall syntax"
          label="Scryfall query"
          onChange={({ target }) => setFilter(target.value)}
          value={filter}
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
