import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { type SystemStyleObject } from '@mui/system';

import { type COLUMNS } from '~/modules/PoisonDartFrog/constants';

type Props = {
  columns: Record<string, boolean>;
  rows: ({ id: number } & { [key in (typeof COLUMNS)[number]]: string })[];
  sx: SystemStyleObject;
};

export const Results = ({ columns, rows, sx }: Props) => (
  <TableContainer component={Paper} sx={sx}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Player</TableCell>
          <TableCell>Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(({ id, player, rank, score }) => (
          <TableRow key={id}>
            <TableCell>{rank}</TableCell>
            <TableCell>{player}</TableCell>
            <TableCell>{score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
