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
  columns: typeof COLUMNS;
  rows: ({ id: number } & { [key in keyof typeof COLUMNS]: string })[];
  sx: SystemStyleObject;
};

export const Results = ({ columns, rows, sx }: Props) => (
  <TableContainer component={Paper} sx={sx}>
    <Table size="small">
      <TableHead>
        <TableRow>
          {Object.entries(columns).map(
            ([name, value]) =>
              value && (
                <TableCell key={name}>
                  <code>{name}</code>
                </TableCell>
              ),
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.entries(columns).map(
              ([name, value]) =>
                value && <TableCell key={name}>{row[name]}</TableCell>,
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
