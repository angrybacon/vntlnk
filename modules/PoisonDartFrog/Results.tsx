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
} from '@mui/material';
import { useNotifications } from '@toolpad/core';

import { type COLUMNS } from '~/modules/PoisonDartFrog/constants';
import { Filters } from '~/modules/PoisonDartFrog/Filters';

type Props = {
  columns: typeof COLUMNS;
  onFilter(index: number, value: boolean): void;
  rows: [id: number, data: string[]][];
};

export const Results = ({ columns, onFilter, rows }: Props) => {
  const { show } = useNotifications();

  const table = rows.map(([id, data]) => ({
    cells: data.map((value, index) => ({
      id: columns[index]?.[0],
      value,
      visible: columns[index]?.[1],
    })),
    id,
  }));

  const handleCopy = (all?: true) => () => {
    const value = table
      .map((row) => {
        const cells = all
          ? row.cells
          : row.cells.filter(({ visible }) => visible);
        return cells.map(({ value }) => value).join('\t');
      })
      .join('\n');
    navigator.clipboard.writeText(value);
    show(`${all ? 'All' : 'Visible'} rows copied to the clipboard`);
  };

  return (
    <Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        <ButtonGroup size="small" sx={{ mb: 2, ml: 'auto' }} variant="outlined">
          <Button onClick={handleCopy(true)} startIcon={<ContentCopyIcon />}>
            Copy all
          </Button>
          <Button onClick={handleCopy()} startIcon={<ContentCopyIcon />}>
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
            {table.map(({ cells, id }) => (
              <TableRow key={id} sx={{ '&:last-child td': { border: 0 } }}>
                {cells.map(
                  ({ id, value, visible }) =>
                    visible && <TableCell key={id}>{value}</TableCell>,
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
