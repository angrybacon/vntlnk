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
    <li>Default sorting is color then name, ascending</li>
    <li>Case is insensitive</li>
    <li>Only English card names are supported</li>
    <li>No pagination, but images are lazily loaded</li>
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
    <li>
      Dual-face cards will come up in results but are impractical to search for
      and broken eg.{' '}
      <Acronym
        definition="Jace, Vryn's Prodigy // Jace, Telepath Unbound"
        text="JVPJTU"
      />
    </li>
    <li>
      Queries are throttled, but there's no cache beyond that of your browser.
      Don't be an asshole
    </li>
  </Typography>
);
