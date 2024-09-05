import { Box, type SxProps } from '@mui/material';

import { Link } from '~/components/Link';

type Props = {
  sx: SxProps;
};

export const Footer = ({ sx }: Props) => (
  <Box
    component="footer"
    sx={[
      { color: 'text.secondary', typography: 'caption' },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    &copy; 2024 Vntlnk contributors. Read the notice about{' '}
    <Link href="/license">licenses and resources</Link>.
  </Box>
);
