import { Typography } from '@mui/material';

export const Help = () => (
  <Typography
    component="ul"
    sx={{ color: 'text.secondary', fontStyle: 'italic' }}
  >
    <li>Default sorting is by color, then by name</li>
    <li>Case is insensitive</li>
    <li>Only English card names are supported</li>
    <li>
      You won't find &ldquo;Collective Brutality&rdquo; by searching for{' '}
      <code>COBRU</code> (yet?)
    </li>
    <li>
      You won't find &ldquo;Dark Confidant&rdquo; by searching for{' '}
      <code>BOB</code> (yet?)
    </li>
    <li>Queries are throttled, but there's no cache. Don't be an asshole</li>
  </Typography>
);
