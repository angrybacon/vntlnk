'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type MouseEvent } from 'react';

const LINKS: [path: string, label: string][] = [
  ['/acronymfinder', 'Acronym Finder'],
  ['/poisondartfrog', 'Poison Dart Frog'],
] as const;

export const Header = () => {
  const pathname = usePathname();
  const trigger = useScrollTrigger();
  const [menuRoot, setMenuRoot] = useState<HTMLElement | null>(null);

  const onClose = () => setMenuRoot(null);

  const onOpen = ({ currentTarget }: MouseEvent<HTMLElement>) =>
    setMenuRoot(currentTarget);

  return (
    <Slide appear={false} in={!trigger}>
      <AppBar elevation={1}>
        <Toolbar sx={{ gap: 1 }}>
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
                color={path === pathname ? 'secondary' : 'inherit'}
                component={NextLink}
                href={path}
                key={path}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  textAlign: 'center',
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { sm: 'none' } }}>
            <IconButton
              aria-expanded={!!menuRoot ? 'true' : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={onOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuRoot}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              keepMounted
              onClose={onClose}
              open={!!menuRoot}
            >
              {LINKS.map(([path, label]) => (
                <MenuItem
                  component={NextLink}
                  href={path}
                  key={path}
                  onClick={onClose}
                  selected={path === pathname}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
