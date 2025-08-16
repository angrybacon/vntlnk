import { Box } from '@mui/material';
import Image from 'next/image';

import { Paper } from '~/components/Paper';
import { Wizard } from '~/modules/ProxyMaker/Wizard';

const FRAMES: Record<string, Record<string, { label: string; path: string }>> =
  // prettier-ignore
  {
    land: {
      colorless: { label: 'Colorless', path: 'land.colorless.png' },
      white:     { label: 'White',     path: 'land.white.png' },
      blue:      { label: 'Blue',      path: 'land.blue.png' },
      black:     { label: 'Black',     path: 'land.black.png' },
      red:       { label: 'Red',       path: 'land.red.png' },
      green:     { label: 'Green',     path: 'land.green.png' },
    },
    retro: {
      artifact:  { label: 'Artifact',  path: 'retro.artifact.png' },
      white:     { label: 'White',     path: 'retro.white.png' },
      blue:      { label: 'Blue',      path: 'retro.blue.png' },
      black:     { label: 'Black',     path: 'retro.black.png' },
      red:       { label: 'Red',       path: 'retro.red.png' },
      green:     { label: 'Green',     path: 'retro.green.png' },
      gold:      { label: 'Gold',      path: 'retro.gold.png' },
    },
  };

type Props = Partial<
  Record<
    | 'artwork'
    | 'flavor'
    | 'frame'
    | 'mana'
    | 'name'
    | 'subtypes'
    | 'text'
    | 'types',
    string | string[]
  >
>;

export const ProxyMaker = ({ ...values }: Props) => {
  const [kind = '', color = ''] = `${values.frame}`.split('.');
  const frame = FRAMES[kind]?.[color]?.path;
  return (
    <Box
      sx={{
        display: 'grid',
        flexGrow: 1,
        gap: { xs: 2, sm: 3 },
        gridTemplateColumns: '1fr auto',
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: '1 / -1', md: 'initial' },
          height: 0,
          minHeight: 1,
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: 1,
          }}
        >
          <Wizard frames={FRAMES} />
        </Paper>
      </Box>
      {frame && (
        <Box
          sx={{
            bgcolor: 'common.black',
            borderRadius: 4,
            boxShadow: 4,
            display: { xs: 'none', md: 'block' },
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              aspectRatio: '715 / 1001', // NOTE Or 5:7
              height: 1,
              position: 'relative',
            }}
          >
            <Image alt="Back" fill src={`/frames/${frame}`} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
