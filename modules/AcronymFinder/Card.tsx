import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { type Card as CardModel } from '~/modules/AcronymFinder/scry';

type Props = {
  card: CardModel;
  height: number;
  width: number;
};

export const Card = ({ card, height, width }: Props) => {
  const [isBroken, setIsBroken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onError = () => {
    setIsBroken(true);
    setIsLoading(false);
  };

  const onLoad = () => setIsLoading(false);

  return (
    <Box
      sx={{
        alignItems: 'center',
        // NOTE Force ratio to iron out irregularities from Scryfall
        aspectRatio: '5 / 7',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        display: 'flex',
        img: {
          display: 'block',
          height: '100%',
          objectFit: 'cover',
          width: '100%',
        },
        justifyContent: 'center',
        overflow: 'clip',
        position: 'relative',
      }}
    >
      {isBroken || !card.image_uris ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 1,
            textAlign: 'center',
          }}
        >
          <BrokenImageIcon fontSize="large" sx={{ color: 'text.disabled' }} />
          <Typography color="text.secondary">{card.name}</Typography>
        </Box>
      ) : (
        <Image
          alt={card.name}
          height={height}
          onError={onError}
          onLoad={onLoad}
          src={card.image_uris.small}
          width={width}
        />
      )}
      {isLoading && (
        <CircularProgress color="secondary" sx={{ position: 'absolute' }} />
      )}
    </Box>
  );
};
