import { type Metadata } from 'next';

import { AcronymFinder } from '~/modules/AcronymFinder/AcronymFinder';

export const metadata: Metadata = {
  title: 'Acronym Finder',
};

export default function Page() {
  return <AcronymFinder />;
}
