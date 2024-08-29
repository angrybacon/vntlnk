import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import { type SystemStyleObject } from '@mui/system';
import { type ChangeEvent } from 'react';

import { Paper } from '~/components/Paper';
import { COLUMNS } from '~/modules/PoisonDartFrog/constants';

const FILTERS = ['rank', 'player', 'score'] as const;

type Filter = (typeof FILTERS)[number];

type Props = {
  onFilter(filter: Filter, value: boolean): void;
  onQuery(query: string): void;
  columns: readonly string[];
  query: string;
  sx: SystemStyleObject;
};

export const Filters = ({ columns, onFilter, onQuery, query, sx }: Props) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if ((FILTERS as readonly string[]).includes(target.name)) {
      onFilter(target.name as Filter, target.checked);
    }
  };

  return (
    <Paper sx={sx}>
      <TextField
        fullWidth
        // TODO Allow filter reset
        label="Filter parsed lines"
        onChange={({ target }) => onQuery(target.value)}
        sx={{ input: { fontFamily: 'monospace' } }}
        value={query}
      />
      <FormGroup row sx={{ gap: 1 }}>
        {COLUMNS.map((f) => (
          <FormControlLabel
            control={<Checkbox checked={columns[f]} onChange={handleChange} />}
            key={f}
            label={<code>{f}</code>}
            name={f}
            sx={{ userSelect: 'none' }}
          />
        ))}
      </FormGroup>
    </Paper>
  );
};
