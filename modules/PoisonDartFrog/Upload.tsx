import { LoadingButton } from '@mui/lab';
import { alpha, Box, type SxProps } from '@mui/material';
import { useNotifications } from '@toolpad/core';
import { useState, type ChangeEvent, type DragEvent } from 'react';

import { type Line } from '~/modules/PoisonDartFrog/models';
import { read } from '~/modules/PoisonDartFrog/read';

const ACCEPT = 'application/pdf';

type Props = {
  onRead(context: { confidence: number; lines: Line[] }): void;
  sx: SxProps;
};

export const Upload = ({ onRead, sx }: Props) => {
  const { show } = useNotifications();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'ok' | 'ko' | null>(null);

  const handleUpload = (file: File | null | undefined) => {
    if (!file) {
      show('Something went real bad. Somehow I lost your file');
      return;
    }
    setBusy(true);
    read(file, show).then(({ confidence, lines }) => {
      onRead({ confidence, lines });
      setBusy(false);
    });
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    const [first] = [...event.dataTransfer.items];
    const value = first?.kind === 'file' && first.type === ACCEPT ? 'ok' : 'ko';
    setStatus(value);
    if (value === 'ko') {
      show('File type not supported, expected a PDF');
    }
  };

  const onDragLeave = () => setStatus(null);

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    // NOTE Necessary in order for `onDragEnter` to have the files available
    event.persist();
    event.preventDefault();
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (status === 'ok') {
      const [first] = [...event.dataTransfer.items];
      if (first?.kind === 'file') {
        const file = first.getAsFile();
        handleUpload(file);
      }
    }
    setStatus(null);
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!busy) {
      const [file] = event.target.files || [];
      handleUpload(file);
    }
  };

  return (
    <Box
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
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
        ({ palette }) =>
          status === 'ko' && {
            backgroundColor: alpha(palette.error.main, 0.1),
            borderColor: alpha(palette.error.main, 0.2),
          },
        ({ palette }) =>
          status === 'ok' && {
            backgroundColor: alpha(palette.primary.main, 0.2),
            borderColor: alpha(palette.primary.main, 0.4),
          },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <LoadingButton
        component="label"
        disabled={status === 'ko'}
        loading={busy}
        size="large"
        variant="outlined"
      >
        Upload file
        <Box
          accept={ACCEPT}
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
