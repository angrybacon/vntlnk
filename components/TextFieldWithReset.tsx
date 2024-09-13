import RestoreIcon from '@mui/icons-material/Restore';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { type ComponentProps, type ReactNode } from 'react';

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
  errors?: { id: number; text: string }[] | string;
  isDirty: boolean;
  onReset(): void;
};

export const TextFieldWithReset = ({
  errors,
  helperText,
  isDirty,
  onReset,
  ...rest
}: Props) => {
  let errorText: ReactNode = null;

  if (Array.isArray(errors)) {
    errorText = errors.length
      ? errors.map(({ id, text }, index) => (
          <Box
            component="span"
            key={id}
            sx={[
              index > 0 && {
                '&:before': { content: "'\\2022'", display: 'inline', mx: 0.5 },
              },
            ]}
          >
            {text}
          </Box>
        ))
      : null;
  } else {
    errorText = errors;
  }

  const endAdornment = isDirty && <Adornment onClick={onReset} />;

  return (
    <TextField
      error={!!errorText}
      helperText={errorText || helperText}
      slotProps={{ input: { endAdornment } }}
      {...rest}
    />
  );
};
