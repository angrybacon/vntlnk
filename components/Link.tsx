import { Link as MuiLink } from '@mui/material';
import NextLink, { type LinkProps } from 'next/link';
import { type PropsWithChildren } from 'react';

export const Link = ({ href, ...rest }: PropsWithChildren<LinkProps>) => {
  const source = typeof href === 'string' ? href : href.pathname;
  const extra = source?.startsWith('http')
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {};
  return <MuiLink component={NextLink} href={href} {...extra} {...rest} />;
};
