import {
 Grid,
 Button,
 Dialog,
 DialogContent,
 DialogTitle,
 Typography
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ErrorIcon from '@mui/icons-material/Error';

export interface PropsDialogDelete {
 handleClose: () => void;
 handleDelete: () => void;
 open: boolean;
 subtitle?: string;
}
const DeleteDialog = ({ handleClose, handleDelete, open, subtitle }: PropsDialogDelete) => {
 return (
  <Dialog onClose={handleClose} open={open}>
   <DialogTitle>
    <Grid container alignItems={'center'} direction={'column'} gap={1}>
     <ErrorIcon fontSize="large" color="warning" />
     <Typography fontSize={20} color={'InfoText'}>
      Desea eliminar este registro?
     </Typography>
      <Typography fontSize={15} color={'InfoText'}>
       { subtitle }
      </Typography>
    </Grid>
   </DialogTitle>
   <DialogContent>
    <Grid container gap={2} justifyContent={'center'}>
     <Button
      sx={{ mt: { xs: 2, md: 0 } }}
      variant="contained"
      startIcon={<CancelIcon fontSize="small" />}
      onClick={handleClose}
     >
      Cancelar
     </Button>
     <Button
      sx={{ mt: { xs: 2, md: 0 } }}
      variant="contained"
      color="error"
      startIcon={<DeleteTwoToneIcon fontSize="small" />}
      onClick={handleDelete}
     >
      Eliminar
     </Button>
    </Grid>
   </DialogContent>
  </Dialog>
 );
};

export default DeleteDialog;
