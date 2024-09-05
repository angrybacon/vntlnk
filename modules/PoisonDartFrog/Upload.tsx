import { LoadingButton } from '@mui/lab';
import { alpha, Box, type SxProps } from '@mui/material';
import { useState, type ChangeEvent } from 'react';

import { type Line } from '~/modules/PoisonDartFrog/models';
import { read } from '~/modules/PoisonDartFrog/read';

type Props = {
  onRead(context: { confidence: number; lines: Line[] }): void;
  sx: SxProps;
};

export const Upload = ({ onRead, sx }: Props) => {
  const [busy, setBusy] = useState(false);

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!busy) {
      setBusy(true);
      const [file] = event.target.files || [];
      if (!file) {
        // TODO Handle more gracefully
        throw new Error('No file found');
      }
      read(file).then(({ confidence, lines }) => {
        onRead({ confidence, lines });
        setBusy(false);
      });
    }
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
      <LoadingButton
        component="label"
        loading={busy}
        size="large"
        variant="outlined"
      >
        Upload file
        <Box
          accept="application/pdf"
          component="input"
          onChange={onUpload}
          sx={{
            bottom: 0,
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            left: 0,
            overflow: 'hidden',
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: 1,
          }}
          type="file"
        />
      </LoadingButton>
    </Box>
  );
};
