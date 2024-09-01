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

type Props = {
  onFilter(name: string, value: boolean): void;
  onQuery(query: string): void;
  columns: Record<string, boolean>;
  query: string;
  sx: SystemStyleObject;
};

export const Filters = ({ columns, onFilter, onQuery, query, sx }: Props) => {
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>) =>
    onFilter(target.name, target.checked);

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
        {Object.keys(COLUMNS).map((column) => (
          <FormControlLabel
            control={
              <Checkbox checked={columns[column]} onChange={handleFilter} />
            }
            key={column}
            label={<code>{column}</code>}
            name={column}
            sx={{ userSelect: 'none' }}
          />
        ))}
      </FormGroup>
    </Paper>
  );
};
