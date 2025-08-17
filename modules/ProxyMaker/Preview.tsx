import { Box, type SxProps } from '@mui/material';
import Image from 'next/image';

type Props = {
  height: number;
  sx: SxProps;
  url: string;
  width: number;
};

export const Preview = ({ height, url, sx, width }: Props) => (
  <Box
    sx={[
      {
        img: {
          bgcolor: 'common.black',
          borderRadius: 4,
          boxShadow: 4,
          display: 'block',
          height: 1,
          width: 1,
        },
        position: 'relative',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Image alt="Back" height={height} priority src={url} width={width} />
  </Box>
);
