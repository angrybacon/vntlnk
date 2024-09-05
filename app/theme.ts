'use client';

import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        pre: { margin: 0 },
      },
    },
    MuiPaper: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        rounded: { borderRadius: 16 },
      },
    },
  },
  palette: { background: { default: grey[50] }, mode: 'light' },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
