import { Box } from '@mui/material';
import { type CSSProperties, type ReactNode } from 'react';

const GEOMETRY: Record<
  Props['zone'],
  Pick<CSSProperties, 'height' | 'left' | 'right' | 'top'>
> =
  // prettier-ignore
  {
    MANA:  { height: '6%',                 right: '5.6%', top: '4%' },
    NAME:  { height: '6%',  left: '8.6%',                 top: '4%' },
    TEXT:  { height: '26%', left: '11%',   right: '11%',  top: '61.5%'},
    TYPES: { height: '6%',  left: '8.1%',                 top: '54.7%' },
  };

const STYLES: Record<Props['zone'], CSSProperties> = {
  MANA: {
    fontFamily: 'MPlantin',
    fontSize: '6cqw',
    justifyContent: 'end',
  },
  NAME: {
    fontFamily: 'Medieval',
    fontSize: '5.8cqw',
    textShadow: '0 0 4px black',
  },
  TEXT: {
    color: 'common.black',
    fontFamily: 'MPlantin',
    fontSize: '4.3cqw',
    lineHeight: 1,
    textShadow: 'none',
    whiteSpace: 'wrap',
  },
  TYPES: {
    fontFamily: 'MPlantin',
    fontSize: '4.5cqw',
    textShadow: '0 0 4px black',
  },
};

type Props = {
  content: ReactNode;
  highlight: boolean;
  zone: 'MANA' | 'NAME' | 'TEXT' | 'TYPES';
};

export const Zone = ({ highlight, content, zone }: Props) =>
  content && (
    <Box
      sx={[
        {
          borderRadius: 1,
          color: 'common.white',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '4cqw',
          gap: 1,
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'absolute',
          px: '2cqw',
          whiteSpace: 'nowrap',
          '> *': { m: 0 },
        },
        highlight && { border: '1px dashed white' },
        GEOMETRY[zone],
        STYLES[zone],
      ]}
    >
      {content}
    </Box>
  );
