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
import { ProgressProvider } from '~/providers/Progress';

export const metadata: Metadata = {
  description: 'A tote bag of Magic: the Gathering related utilities',
  title: { default: 'Vntlnk', template: '%s • Vntlnk' },
};

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: '#3f51b5',
  width: 'device-width',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="html" lang="en">
        <Box component="body">
          <ProgressProvider>
            <Header />
            <Container
              component="main"
              maxWidth="xl"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                pb: 2,
                pt: { xs: 2, sm: 3 },
              }}
            >
              <Toolbar role="presentation" />
              {children}
              <Footer sx={{ mt: 'auto', pt: 2, textAlign: 'center' }} />
            </Container>
          </ProgressProvider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
