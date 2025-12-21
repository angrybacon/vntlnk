import { Box, type SxProps } from '@mui/material';
import Image from 'next/image';

import { Markdown } from '~/modules/ProxyMaker/Markdown';
import { Zone } from '~/modules/ProxyMaker/Zone';

type Props = {
  height: number;
  overlay?: boolean;
  sx: SxProps;
  url: string;
  values: Record<string, string | undefined>;
  width: number;
};

export const Preview = ({
  height,
  overlay = false,
  url,
  sx,
  values,
  width,
}: Props) => {
  const makeTextbox = (values: Record<string, string | undefined>) => {
    const text = [values.text, values.flavor].filter(Boolean).join('\n\n');
    const markdown = <Markdown text={text} />;
    return markdown;
  };

  const makeTypeline = (values: Record<string, string | undefined>) => {
    const { types, subtypes } = values;
    return types && [types, subtypes].filter(Boolean).join(' — ');
  };

  return (
    <Box
      sx={[
        {
          bgcolor: 'common.black',
          borderRadius: 4,
          boxShadow: 4,
          containerType: 'inline-size', // NOTE Required for container units
          img: { display: 'block', height: 1, width: 1 },
          overflow: 'hidden',
          position: 'relative',
        },
        overlay && { img: { filter: 'blur(4px)' } },
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
      <Zone content={values.name} highlight={overlay} zone="NAME" />
      <Zone content={values.mana} highlight={overlay} zone="MANA" />
      <Zone content={makeTypeline(values)} highlight={overlay} zone="TYPES" />
      <Zone content={makeTextbox(values)} highlight={overlay} zone="TEXT" />
    </Box>
  );
};
