import { Typography } from '@mui/material';
import { type SystemStyleObject } from '@mui/system';

import { Paper } from '~/components/Paper';

type Props = {
  confidence: number | undefined;
  lines: { text: string }[];
  sx: SystemStyleObject;
};

export const Parsed = ({ confidence, lines, sx }: Props) => (
  <Paper component="pre" sx={sx}>
    {lines.map(({ text }) => text).join('\n')}
  </Paper>
);
