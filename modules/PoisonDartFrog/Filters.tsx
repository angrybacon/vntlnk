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
  const onChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) =>
    onFilter(index, event.target.checked);

  return (
    <Box sx={sx}>
      <Typography gutterBottom>
        {columns.length > 0 ? (
          <>
            Could guess {columns.length} columns in the filtered lines. Use the
            checkboxes to show more columns.
          </>
        ) : (
          <>
            Could not guess any column. Adjust your query to find result rows
            withint the parsed content.
          </>
        )}
      </Typography>
      <FormGroup row sx={{ gap: 1 }}>
        {columns.map(([id, should], index) => (
          <FormControlLabel
            control={<Checkbox checked={should} onChange={onChange(index)} />}
            key={id}
            label={<code>{id}</code>}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
