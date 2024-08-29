import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import { type Metadata, type Viewport } from 'next';
import { type PropsWithChildren } from 'react';

import { theme } from '~/app/theme';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';

export const metadata: Metadata = {
  description: 'A bridge with EventLink',
  title: 'VntLnk',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="html" lang="en">
        <Box component="body">
          <Header />
          <Container
            component="main"
            maxWidth="xl"
            sx={{
              // backgroundColor: 'background.default',
              py: { xs: 2, sm: 3 },
            }}
          >
            <Toolbar role="presentation" />
            {children}
            <Footer sx={{ textAlign: 'center' }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
