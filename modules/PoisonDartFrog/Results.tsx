import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import { useNotifications } from '@toolpad/core';

import { type COLUMNS } from '~/modules/PoisonDartFrog/constants';
import { Filters } from '~/modules/PoisonDartFrog/Filters';

type Props = {
  columns: typeof COLUMNS;
  onFilter(index: number, value: boolean): void;
  onPreview(): void;
  rows: [id: number, data: string[]][];
};

export const Results = ({ columns, onFilter, onPreview, rows }: Props) => {
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

  const iconStyles: SxProps = { display: { xs: 'none', sm: 'block' } };

  return (
    <Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button
          onClick={onPreview}
          size="small"
          startIcon={<PictureAsPdfIcon sx={iconStyles} />}
          variant="outlined"
        >
          View original
        </Button>
        <ButtonGroup size="small" sx={{ ml: 1 }} variant="outlined">
          <Button
            onClick={handleCopy(true)}
            startIcon={<ContentCopyIcon sx={iconStyles} />}
          >
            Copy all
          </Button>
          <Button
            onClick={handleCopy()}
            startIcon={<ContentCopyIcon sx={iconStyles} />}
          >
            Copy visible
          </Button>
        </ButtonGroup>
      </Box>
      <Filters columns={columns} onFilter={onFilter} sx={{ px: 2 }} />
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
