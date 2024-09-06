import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RestoreIcon from '@mui/icons-material/Restore';
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  type SxProps,
} from '@mui/material';
import { Fragment } from 'react';

import { Paper } from '~/components/Paper';
import { QUERY_PATTERN } from '~/modules/PoisonDartFrog/constants';
import { type Line } from '~/modules/PoisonDartFrog/models';

const NEGATIVE = '#B3589A80';
const POSITIVE = '#9BBF8580';

const COLORS = Array(11)
  .fill(null)
  .map(
    (_, index) => `color-mix(in srgb, ${NEGATIVE}, ${POSITIVE} ${index * 10}%)`,
  );

const confidenceToColor = (value: number) => COLORS[Math.floor(value / 10)];

type Props = {
  confidence: number;
  lines: Line[];
  onQuery(query: string): void;
  pattern: RegExp | undefined;
  patternError: string | undefined;
  query: string;
};

export const Parsed = ({
  confidence,
  lines,
  onQuery,
  pattern,
  patternError,
  query,
}: Props) => {
  const errorIcon = <ErrorIcon color="error" />;
  const successIcon = <CheckCircleIcon />;
  const matches = pattern
    ? lines.filter((line) => line.text.match(pattern))
    : [];

  const onReset = () => onQuery(QUERY_PATTERN);

  return (
    <Paper>
      <TextField
        error={!!patternError}
        fullWidth
        helperText={
          patternError ||
          'Use capture groups in order to filter lines and target specific columns'
        }
        label="Filter parsed lines"
        // TODO Allow filter reset
        onChange={({ target }) => onQuery(target.value)}
        slotProps={{
          input: {
            endAdornment: query !== QUERY_PATTERN && (
              <InputAdornment position="end">
                <Tooltip title="Restore default value">
                  <IconButton onClick={onReset}>
                    <RestoreIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          },
        }}
        sx={{ input: { fontFamily: 'monospace' } }}
        value={query}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip
          icon={confidence ? successIcon : errorIcon}
          label={`Total confidence ${confidence}%`}
          size="small"
          variant="outlined"
        />
        <Chip
          icon={matches.length ? successIcon : errorIcon}
          label={`Matched ${matches.length} lines`}
          size="small"
          variant="outlined"
        />
        <Chip
          icon={pattern ? successIcon : errorIcon}
          label={`${pattern ? 'Valid' : 'Invalid'} pattern`}
          size="small"
          variant="outlined"
        />
      </Box>
      <Box
        component="pre"
        sx={{
          cursor: 'default',
          display: 'grid',
          fontSize: 'body2.fontSize',
          gap: 0.5,
          gridTemplateColumns: 'auto 1fr',
          overflowX: 'auto',
        }}
      >
        {lines.map((line) => (
          <Fragment key={line.id}>
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
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {line.words.map((word) => (
                <Tooltip
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
                      },
                      !!pattern &&
                        line.text.match(pattern) && {
                          backgroundColor: confidenceToColor(word.confidence),
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
          </Fragment>
        ))}
      </Box>
    </Paper>
  );
};
