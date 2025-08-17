import { Box } from '@mui/material';
import { type CSSProperties } from 'react';

import { type FIELDS } from '~/modules/ProxyMaker/fields';

const GEOMETRY: Record<
  (typeof FIELDS)[number],
  Pick<CSSProperties, 'height' | 'left' | 'right' | 'top'>
> =
  // prettier-ignore
  {
    FLAVOR:   { height: '16%', left: '13%',  top: '71%'},
    MANA:     { height: '6%', right: '5.6%', top: '4%' },
    NAME:     { height: '6%', left: '8.6%', top: '4%' },
    TYPES:    { height: '6%', left: '8.5%', top: '54.8%' },
  };

const STYLES: Record<(typeof FIELDS)[number], CSSProperties> =
  // prettier-ignore
  {
    ARTWORK:  {},
    FLAVOR:   { color: 'common.black', fontStyle: 'italic', textShadow: 'none' },
    FRAME:    {},
    MANA:     { fontSize: '6cqw', justifyContent: 'end' },
    NAME:     { fontSize: '5.8cqw' },
    SUBTYPES: {},
    TEXT:     {},
    TYPES:    { fontSize: '5.1cqw' },
  };

type Props = {
  text?: string | string[];
  zone: (typeof FIELDS)[number];
};

export const Zone = ({ text, zone }: Props) => (
  <Box
    sx={[
      {
        alignItems: 'center',
        display: 'flex',
        fontFamily: 'Goudy Mediaeval Alternate',
        fontSize: '4cqw',
        overflow: 'hidden',
        px: '2cqw',
        whiteSpace: 'nowrap',
      },
      GEOMETRY[zone],
      STYLES[zone],
    ]}
  >
    {text}
  </Box>
);
