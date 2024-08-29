import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  href: string;
};

export const Link = ({ children, href }: Props) => {
  const extra = href.startsWith('http')
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {};
  return (
    <MuiLink component={NextLink} href={href} {...extra}>
      {children}
    </MuiLink>
  );
};
