import { Paper as MuiPaper, type PaperProps } from '@mui/material';

type Props = PaperProps & {
  dense?: boolean;
};

export const Paper = ({ dense = false, sx, ...rest }: Props) => (
  <MuiPaper
    {...rest}
    sx={[
      { borderRadius: 4, display: 'grid', gap: 2 },
      !dense && { p: 2 },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    variant="outlined"
  />
);
