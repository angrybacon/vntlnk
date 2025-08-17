import { Box, Typography } from '@mui/material';

import { Paper } from '~/components/Paper';
import { Preview } from '~/modules/ProxyMaker/Preview';
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
    <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 } }}>
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
      <Box
        sx={{
          alignItems: 'center',
          aspectRatio: '715 / 1001', // NOTE Or 5:7
          display: { xs: 'none', md: 'flex' },
          height: 1,
          justifyContent: 'center',
        }}
      >
        {frame ? (
          <Preview
            height={1001}
            url={`/frames/${frame}`}
            sx={{ height: 1, width: 1 }}
            width={715}
          />
        ) : (
          <Typography component="em" sx={{ color: 'text.secondary' }}>
            Select a frame in order to start the customization.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
