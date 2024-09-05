import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  type SxProps,
} from '@mui/material';
import { type ChangeEvent } from 'react';

import { type COLUMNS } from '~/modules/PoisonDartFrog/constants';

type Props = {
  onFilter(index: number, value: boolean): void;
  columns: typeof COLUMNS;
  sx: SxProps;
};

export const Filters = ({ columns, onFilter, sx }: Props) => {
  const handleFilter =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) =>
      onFilter(index, event.target.checked);

  return (
    <Box sx={sx}>
      <Typography>
        Found {columns.length} columns in the filtered lines.{' '}
        {columns.length > 0 ? (
          <>Use the checkboxes to show more columns.</>
        ) : (
          <>Adjust your query to find result rows withint the parsed content.</>
        )}
      </Typography>
      <FormGroup row sx={{ gap: 1 }}>
        {columns.map(([id, should], index) => (
          <FormControlLabel
            control={
              <Checkbox checked={should} onChange={handleFilter(index)} />
            }
            key={id}
            label={<code>{id}</code>}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
