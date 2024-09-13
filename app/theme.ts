'use client';

import { createTheme } from '@mui/material';
import { grey, indigo, pink } from '@mui/material/colors';
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
        'body, html': { height: '100%' },
        pre: { margin: 0 },
      },
    },
    MuiSnackbar: {
      defaultProps: { autoHideDuration: 4000 },
    },
    MuiTooltip: {
      defaultProps: { placement: 'top' },
    },
  },
  palette: {
    background: { default: grey[50] },
    mode: 'light',
    primary: indigo,
    secondary: pink,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
