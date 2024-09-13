import { Typography } from '@mui/material';

import { Link } from '~/components/Link';

const URLS = {
  LICENSE: 'https://github.com/angrybacon/vntlnk/blob/master/LICENSE.org',
  REPOSITORY: 'https://github.com/angrybacon/vntlnk',
  SCRYFALL_API: 'https://scryfall.com/docs/api',
  WIZARDS_FCP: 'https://company.wizards.com/en/legal/fancontentpolicy',
};

export default function Page() {
  return (
    <>
      <Typography gutterBottom variant="h2">
        License and Resources
      </Typography>
      <Typography gutterBottom>
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
      <Typography gutterBottom>
        All original code is available under the terms of the{' '}
        <Link href={URLS.LICENSE}>MIT license</Link>. For more information about
        the underlying code, refer to the{' '}
        <Link href={URLS.REPOSITORY}>GitHub repository</Link>.
      </Typography>
    </>
  );
}
