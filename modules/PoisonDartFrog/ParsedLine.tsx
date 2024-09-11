import { Box, Tooltip } from '@mui/material';

import { type Line } from '~/modules/PoisonDartFrog/models';

const NEGATIVE = '#B3589A80';
const POSITIVE = '#9BBF8580';

const COLORS = Array(11)
  .fill(null)
  .map(
    (_, index) => `color-mix(in srgb, ${NEGATIVE}, ${POSITIVE} ${index * 10}%)`,
  );

const toColor = (value: number) => COLORS[Math.floor(value / 10)];

type Props = {
  isHighlighted: boolean;
  line: Line;
};

export const ParsedLine = ({ isHighlighted, line }: Props) => (
  <>
    {line.words.length > 0 ? (
      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          px: 0.5,
        }}
      >
        {line.confidence}%
      </Box>
    ) : (
      // NOTE The parent grid expects an prefix for alignment purposes
      <div />
    )}
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {!line.words.length
        ? line.text
        : line.words.map((word) => (
            <Tooltip
              enterTouchDelay={0}
              followCursor
              key={word.id}
              title={`Confidence: ${word.confidence}%`}
            >
              <Box
                sx={[
                  {
                    alignItems: 'center',
                    backgroundColor: 'grey.A200',
                    borderRadius: 1,
                    display: 'flex',
                    overflow: 'hidden',
                    userSelect: 'none',
                  },
                  isHighlighted && {
                    backgroundColor: toColor(word.confidence),
                  },
                ]}
              >
                <Box
                  sx={{
                    px: 0.25,
                    '&:hover': { backgroundColor: 'action.hover' },
                  }}
                >
                  {word.text}
                </Box>
              </Box>
            </Tooltip>
          ))}
    </Box>
  </>
);
