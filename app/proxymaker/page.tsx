import { type Metadata } from 'next';

import { ProxyMaker } from '~/modules/ProxyMaker/ProxyMaker';

export const metadata: Metadata = {
  title: 'Proxy Maker',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const parameters = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      // NOTE We don't actually want to support multiple values per key
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  return <ProxyMaker {...parameters} />;
}
