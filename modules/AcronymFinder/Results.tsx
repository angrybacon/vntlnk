import { Box } from '@mui/material';
import { memo } from 'react';

import { Card } from '~/modules/AcronymFinder/Card';
import { type Card as CardModel } from '~/modules/Scry/typings';

const IMAGE_HEIGHT = 204;
const IMAGE_WIDTH = 146;

type Props = {
  cards: CardModel[];
};

const Results = ({ cards }: Props) => (
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
);

export const MemoizedResults = memo(Results);
