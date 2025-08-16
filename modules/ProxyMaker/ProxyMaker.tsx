import { Box } from '@mui/material';
import Image from 'next/image';

import { Paper } from '~/components/Paper';
import { Wizard } from '~/modules/ProxyMaker/Wizard';

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
  console.info(values);
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
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <Wizard />
        </Paper>
      </Box>
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
          <Image alt="Back" fill src="/frames/back.png" />
        </Box>
      </Box>
    </Box>
  );
};
