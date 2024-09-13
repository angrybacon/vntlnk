import { Typography, type SxProps } from '@mui/material';

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
    <li>Default sorting is by color, then by name, ascending</li>
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
    <li>Queries are throttled, but there's no cache. Don't be an asshole</li>
  </Typography>
);
