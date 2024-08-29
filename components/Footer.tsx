import { Box } from '@mui/material';
import { type SystemStyleObject } from '@mui/system';

import { Link } from '~/components/Link';

type Props = {
  sx: SystemStyleObject;
};

export const Footer = ({ sx }: Props) => (
  <Box
    component="footer"
    sx={[{ color: 'text.secondary', typography: 'caption' }, sx]}
  >
    &copy; 2024 Vntlnk contributors. Read the notice about{' '}
    <Link href="/license">licenses and resources</Link>.
  </Box>
);
