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
  title: 'Vntlnk',
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
