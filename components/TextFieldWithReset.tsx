import RestoreIcon from '@mui/icons-material/Restore';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { type ComponentProps } from 'react';

const Adornment = ({ onClick }: { onClick(): void }) => (
  <InputAdornment position="end">
    <Tooltip title="Restore default value">
      <IconButton onClick={onClick}>
        <RestoreIcon />
      </IconButton>
    </Tooltip>
  </InputAdornment>
);

type Props = ComponentProps<typeof TextField> & {
  isDirty: boolean;
  onReset(): void;
};

export const TextFieldWithReset = ({ isDirty, onReset, ...rest }: Props) => (
  <TextField
    slotProps={{
      input: { endAdornment: isDirty && <Adornment onClick={onReset} /> },
    }}
    {...rest}
  />
);
