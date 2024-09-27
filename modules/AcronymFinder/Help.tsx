import { Box, Typography, type SxProps } from '@mui/material';

import { Acronym } from '~/components/Acronym';

type Props = {
  sx: SxProps;
};

export const Help = ({ sx }: Props) => (
  <Typography
    component="ul"
    sx={[
      { color: 'text.secondary', fontStyle: 'italic', pl: '1em' },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box component="li" sx={{ maxWidth: 600 }}>
      <Box color="warning.main" component="span">
        Yes I know images are sometimes broken.
      </Box>{' '}
      You've been too many too fast to use the service and all the monthly
      credit has been depleted. I'll fix it soon :tm:
    </Box>
    <li>Default sorting is color then name, ascending</li>
    <li>Case is insensitive</li>
    <li>Only English card names are supported</li>
    <li>Only the first 99 matches are displayed</li>
    <li>
      Extra characters are not supported eg.{' '}
      <Acronym definition="Bloodbraid Elf" text="BBE" />
    </li>
    <li>
      Fuzzy match is not supported eg.{' '}
      <Acronym definition="Collective Brutality" text="CoBru" />
    </li>
    <li>
      Nicknames are not supported eg.{' '}
      <Acronym definition="Dark Confidant" text="Bob" />
    </li>
    <li>
      Abbreviations are not supported eg.{' '}
      <Acronym definition="Devil K. Nevil" text="DKN" />
    </li>
    <li>Queries are throttled, but there's no cache. Don't be an asshole</li>
  </Typography>
);
