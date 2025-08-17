import { Typography } from '@mui/material';

import { Link } from '~/components/Link';

const URLS = {
  LICENSE: 'https://github.com/angrybacon/vntlnk/blob/master/LICENSE.org',
  REPOSITORY: 'https://github.com/angrybacon/vntlnk',
  SCRYFALL_API: 'https://scryfall.com/docs/api',
  WIZARDS_FCP: 'https://company.wizards.com/en/legal/fancontentpolicy',
};

export default () => (
  <>
    <Typography variant="h1">License and Resources</Typography>
    <Typography>
      <em>Vntlnk</em> is unofficial <em>Magic: the Gathering</em> fan content
      permitted under the{' '}
      <Link href={URLS.WIZARDS_FCP}>Fan Content Policy</Link>. Portions of the
      materials used such as a mana symbols and game mechanics are property of
      <em>Wizards of the Coast</em>. Card arts are made available from the
      unaltered <Link href={URLS.SCRYFALL_API}>Scryfall's API</Link> and are
      copyright <em>Wizard of the Coast</em> or their respective artists for
      older sets. For cropped arts where the artist line of a card is not
      visible, the artists are mentioned in the accessible text.
    </Typography>
    <Typography>
      The <em>Goudy Mediaeval</em> typeface, as originally designed by Frederic
      William Goudy appears to be free of use (as in freedom of speech). It was
      however distributed digitally by Dieter Steffmann and is very likely the
      copy that is used in this project. It did not come with its own licensing
      so we assume that it is equally free. If you believe this to be
      inaccurate, please contact us through our mutual channels.
    </Typography>
    <Typography>
      All original code is available under the terms of the{' '}
      <Link href={URLS.LICENSE}>MIT license</Link>. For more information about
      the underlying code, refer to the{' '}
      <Link href={URLS.REPOSITORY}>GitHub repository</Link>.
    </Typography>
  </>
);
