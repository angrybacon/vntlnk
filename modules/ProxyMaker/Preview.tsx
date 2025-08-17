import { Box, type SxProps } from '@mui/material';
import Image from 'next/image';

import { FIELDS } from '~/modules/ProxyMaker/fields';
import { Zone } from '~/modules/ProxyMaker/Zone';

type Props = {
  height: number;
  overlay: boolean;
  sx: SxProps;
  url: string;
  // TODO Hopepully we can sanitize this to plain strings
  values: Record<string, string | string[]>;
  width: number;
};

export const Preview = ({ height, overlay, url, sx, values, width }: Props) => (
  <Box
    sx={[
      {
        bgcolor: 'common.black',
        borderRadius: 4,
        boxShadow: 4,
        color: 'common.white',
        containerType: 'inline-size', // NOTE Required for container units
        div: { position: 'absolute' },
        img: { display: 'block', height: 1, width: 1 },
        overflow: 'hidden',
        position: 'relative',
        textShadow: '0 0 4px black',
      },
      overlay && {
        div: { border: '1px dashed white', borderRadius: 1 },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Image
      alt="Card frame"
      height={height}
      priority
      src={url}
      width={width}
    />
    {FIELDS.map((field) => {
      const text = values[field.toLowerCase()];
      return text && <Zone key={field} text={text} zone={field} />;
    })}
  </Box>
);
