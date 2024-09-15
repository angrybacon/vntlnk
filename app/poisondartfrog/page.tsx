import { type Metadata } from 'next';

import { PoisonDartFrog } from '~/modules/PoisonDartFrog/PoisonDartFrog';

export const metadata: Metadata = {
  title: 'Poison Dart Frog',
};

export default function Page() {
  return <PoisonDartFrog />;
}
