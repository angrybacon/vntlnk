import { Box } from '@mui/material';
import { type PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexBasis: 'auto',
        flexGrow: 1,
        flexShrink: 1,
        gap: 3,
        height: 0,
      }}
    >
      {children}
    </Box>
  );
}
