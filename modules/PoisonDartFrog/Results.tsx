import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type SxProps,
} from '@mui/material';

import { type COLUMNS } from '~/modules/PoisonDartFrog/constants';
import { Filters } from '~/modules/PoisonDartFrog/Filters';

type Props = {
  columns: typeof COLUMNS;
  onFilter(index: number, value: boolean): void;
  rows: [id: number, data: string[]][];
  sx: SxProps;
};

export const Results = ({ columns, onFilter, rows, sx }: Props) => (
  <Paper sx={sx}>
    <Filters columns={columns} onFilter={onFilter} sx={{ p: 2 }} />
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(
              ([id, should]) =>
                should && (
                  <TableCell key={id}>
                    <code>{id}</code>
                  </TableCell>
                ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(([id, data]) => (
            <TableRow key={id}>
              {data.map(
                (value, index) =>
                  columns[index]?.[1] && (
                    <TableCell key={columns[index]?.[0]}>{value}</TableCell>
                  ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);
