import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { type Metadata, type Viewport } from 'next';
import { Roboto } from 'next/font/google';
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

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
});

export default ({ children }: PropsWithChildren) => (
  <html className={roboto.variable} lang="en">
    <Box
      component="body"
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ProgressProvider>
            <Header />
            <Container
              component="main"
              maxWidth="xl"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                gap: { xs: 2, sm: 3 },
              }}
            >
              <Toolbar role="presentation" sx={{ flexShrink: 0 }} />
              {children}
            </Container>
            <Footer sx={{ mt: 'auto', p: { xs: 2, sm: 3 } }} />
          </ProgressProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Box>
  </html>
);
