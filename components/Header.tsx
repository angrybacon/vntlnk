'use client';

import {
  AppBar,
  Box,
  Button,
  Slide,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import NextLink from 'next/link';

export const Header = () => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} in={!trigger}>
      <AppBar elevation={1}>
        <Toolbar>
          <Button
            color="inherit"
            component={NextLink}
            disableElevation
            href="/"
            variant="outlined"
          >
            Vntlnk
          </Button>
          <Box component="nav" sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
            <Button color="inherit" component={NextLink} href="/poisondartfrog">
              PoisonDartFrog
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
