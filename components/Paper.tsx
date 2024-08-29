import { Paper as MuiPaper, type PaperProps } from '@mui/material';
import { type SystemStyleObject } from '@mui/system';

type Props = PaperProps & {
  sx: SystemStyleObject;
};

export const Paper = ({ sx, ...rest }: Props) => (
  <MuiPaper {...rest} sx={[{ display: 'grid', gap: 2, p: 3 }, sx]} />
);
