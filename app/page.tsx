import { Typography } from '@mui/material';

import { Link } from '~/components/Link';

export default function Page() {
  return (
    <>
      <Typography gutterBottom variant="h2">
        Hello World
      </Typography>
      <Typography gutterBottom>
        This is my sandbox, this is where my experiments go. They're free to
        use, therefore you cannot complain about bugs but if you must, please do
        it <Link href="https://github.com/angrybacon/vntlnk/issues">here</Link>.
      </Typography>
      <Typography gutterBottom></Typography>
      <Typography gutterBottom>
        Provided as is, both <em>gratis</em> and <em>libre</em> with no warranty
        of any kind.
      </Typography>
    </>
  );
}
