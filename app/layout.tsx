import { type PropsWithChildren } from 'react';

import './global.scss';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
