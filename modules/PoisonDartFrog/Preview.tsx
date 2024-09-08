import { Box, Button, Dialog, DialogActions } from '@mui/material';

type Props = {
  file?: string;
  onClose(): void;
  open: boolean;
};

export const Preview = ({ file, onClose, open }: Props) => (
  <Dialog fullWidth keepMounted maxWidth={false} onClose={onClose} open={open}>
    {file && (
      <Box sx={{ pt: 1, px: 1 }}>
        <Box
          component="iframe"
          src={file}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: ({ shape }) => shape.borderRadius / 2,
            height: '80vh',
            width: '100%',
          }}
        />
      </Box>
    )}
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);
