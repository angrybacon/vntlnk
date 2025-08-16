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
  return <ProxyMaker {...await searchParams} />;
}
