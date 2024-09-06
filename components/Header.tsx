'use client';

import { AppBar, Slide, Toolbar, useScrollTrigger } from '@mui/material';

export const Header = () => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} in={!trigger}>
      <AppBar elevation={1}>
        <Toolbar />
      </AppBar>
    </Slide>
  );
};
