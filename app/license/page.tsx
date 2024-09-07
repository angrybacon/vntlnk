import { Typography } from '@mui/material';

import { Link } from '~/components/Link';

const LICENSE_URL =
  'https://github.com/angrybacon/vntlnk/blob/master/LICENSE.org';
const REPOSITORY_URL = 'https://github.com/angrybacon/vntlnk';

export default function Page() {
  return (
    <>
      <Typography gutterBottom variant="h2">
        License and Resources
      </Typography>
      <Typography gutterBottom>
        <em>Vntlnk</em> is not endorsed nor supported by{' '}
        <em>Wizards of the Coast</em> or any other affiliated origanization.
      </Typography>
      <Typography gutterBottom>
        All original code is available under the terms of the{' '}
        <Link href={LICENSE_URL}>MIT license</Link>. For more information about
        the underlying code, refer to the{' '}
        <Link href={REPOSITORY_URL}>GitHub repository</Link>.
      </Typography>
    </>
  );
}
