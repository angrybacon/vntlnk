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
} from '@mui/material';
import { useEffect, type ChangeEvent } from 'react';

import { Link } from '~/components/Link';
import { Paper } from '~/components/Paper';
import { useDebounce } from '~/hooks/useDebounce';
import { QUERY_PATTERN } from '~/modules/PoisonDartFrog/constants';
import { type Line } from '~/modules/PoisonDartFrog/models';
import { ParsedLine } from '~/modules/PoisonDartFrog/ParsedLine';

type Props = {
  confidence: number;
  lines: Line[];
  onQuery(query: string): void;
  pattern: RegExp | undefined;
  patternError: string | undefined;
};

export const Parsed = ({
  confidence,
  lines,
  onQuery,
  pattern,
  patternError,
}: Props) => {
  const [filter, setFilter, filterSafe] = useDebounce(QUERY_PATTERN);

  useEffect(() => {
    onQuery(filterSafe);
  }, [filterSafe]);

  const errorIcon = <ErrorIcon color="error" />;
  const successIcon = <CheckCircleIcon />;
  const matches = pattern
    ? lines.filter((line) => line.text.match(pattern))
    : [];

  const onFilter = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFilter(target.value);

  const onReset = () => setFilter(QUERY_PATTERN);

  return (
    <Paper>
      <TextField
        error={!!patternError}
        fullWidth
        helperText={
          patternError || (
            <>
              Filter lines and use{' '}
              <Link href="https://regex101.com">capturing groups</Link> to
              target columns
            </>
          )
        }
        label="Filter parsed lines"
        onChange={onFilter}
        size="small"
        slotProps={{
          input: {
            endAdornment: filterSafe !== QUERY_PATTERN && (
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
        value={filter}
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
          <ParsedLine
            isHighlighted={!!(pattern && line.text.match(pattern))}
            key={line.id}
            line={line}
          />
        ))}
      </Box>
    </Paper>
  );
};
