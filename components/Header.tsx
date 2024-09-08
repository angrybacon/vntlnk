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

const LINKS: [path: string, label: string][] = [
  ['/poisondartfrog', 'Poison Dart Frog'],
] as const;

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
            {LINKS.map(([path, label]) => (
              <Button
                color="inherit"
                component={NextLink}
                href={path}
                key={path}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
