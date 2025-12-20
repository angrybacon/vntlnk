'use client';

import { createTheme, responsiveFontSizes } from '@mui/material';
import { grey, indigo, pink } from '@mui/material/colors';

export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { fontSize: 18 },
          pre: { margin: 0 },
        },
      },
      MuiDialog: {
        styleOverrides: { paper: { borderRadius: 16 } },
      },
      MuiSnackbar: {
        defaultProps: { autoHideDuration: 4000 },
      },
      MuiTooltip: {
        defaultProps: { placement: 'top' },
      },
    },
    cssVariables: true,
    palette: {
      background: { default: grey[50] },
      mode: 'light',
      primary: indigo,
      secondary: pink,
    },
    typography: {
      fontFamily: 'var(--font-roboto)',
      h1: { fontSize: '3.2rem' },
      h2: { fontSize: '2.6rem' },
      h3: { fontSize: '2.4rem' },
      h4: { fontSize: '2.0rem' },
      h5: { fontSize: '1.4rem' },
      h6: { fontSize: '1.2rem' },
    },
  }),
);
