import {
  Paper as MuiPaper,
  type PaperProps,
  type SxProps,
} from '@mui/material';

type Props = PaperProps & {
  sx?: SxProps;
};

export const Paper = ({ sx, ...rest }: Props) => (
  <MuiPaper
    {...rest}
    sx={[{ display: 'grid', gap: 2, p: 3 }, ...(Array.isArray(sx) ? sx : [sx])]}
  />
);
