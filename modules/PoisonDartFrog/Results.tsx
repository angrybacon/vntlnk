import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Button,
  ButtonGroup,
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
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
      <ButtonGroup disabled sx={{ mb: 2, ml: 'auto' }} variant="outlined">
        <Button
          aria-label="Copy all"
          size="small"
          startIcon={<ContentCopyIcon />}
        >
          Copy all
        </Button>
        <Button
          aria-label="Copy visible"
          size="small"
          startIcon={<ContentCopyIcon />}
        >
          Copy visible
        </Button>
      </ButtonGroup>
      <Filters columns={columns} onFilter={onFilter} />
    </Box>
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
