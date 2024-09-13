import { Tooltip, Typography } from '@mui/material';

type Props = {
  definition: string;
  text: string;
};

export const Acronym = ({ definition, text }: Props) => (
  <Tooltip describeChild followCursor title={definition}>
    <Typography component="abbr">{text}</Typography>
  </Tooltip>
);
