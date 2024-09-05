import { type ChangeEvent } from 'react';
import { alpha, Box, Button, type SxProps } from '@mui/material';

import { read } from '~/modules/PoisonDartFrog/read';

type Props = {
  onRead(context: { confidence: number; lines: Line[] }): void;
  sx: SxProps;
};

export const Upload = ({ onRead, sx }: Props) => {
  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (!file) {
      // TODO Handle more gracefully
      throw new Error('No file found');
    }
    read(file).then(({ confidence, lines }) => onRead({ confidence, lines }));
  };

  return (
    <Box
      sx={[
        ({ palette, shape }) => ({
          alignItems: 'center',
          backgroundColor: alpha(palette.primary.main, 0.1),
          borderRadius: shape.borderRadius,
          borderColor: alpha(palette.primary.main, 0.2),
          borderStyle: 'dashed',
          borderWidth: 2,
          display: 'flex',
          height: 100,
          justifyContent: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Button
        component="label"
        size="large"
        sx={{
          gridArea: 'input',
          input: {
            bottom: 0,
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            left: 0,
            overflow: 'hidden',
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: 1,
          },
        }}
        variant="outlined"
      >
        Upload file
        <input accept="application/pdf" onChange={onUpload} type="file" />
      </Button>
    </Box>
  );
};
