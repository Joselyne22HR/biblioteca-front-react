import {
 Card,
 CardHeader,
 Container,
 Divider,
 Grid,
 IconButton,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Tooltip,
 useTheme
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDeleteEditorialMutation, useGetEditorialsQuery } from '../slice/editorialApiSlice';
import { Editorial } from '../interface/editorial.interface';
import { useEffect, useState } from 'react';
import { setDeleteModal } from '../slice/editorialSlice';
import { useAppDispatch, useAppSelector } from 'src/store/useRedux';
import DeleteDialog from 'src/shared/DeleteDialog';

const ScreenEditorial = () => {
 const theme = useTheme();
 const dispatch = useAppDispatch();
 const { isDeleteModal } = useAppSelector((state) => state.editorial);
 const navigate = useNavigate();
 const handleCreate = () => navigate('/mantenimientos/new-editorial', { replace: true });
 const [rowSelect, setRowSelect] = useState<Editorial>();

 const { data } = useGetEditorialsQuery();
 const [deleteEditorial, { isSuccess }] = useDeleteEditorialMutation();

 useEffect(() => {
    if (isSuccess) dispatch(setDeleteModal(false));
 }, [isSuccess, dispatch])
 
 return (
  <>
   <Helmet>
    <title>Editorial</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Editorial'}
     subtitle={'Aquí podrás ver todos las editoriales disponibles.'}
     buttonTitle={'Crear editorial'}
     handleClick={handleCreate}
    />
   </PageTitleWrapper>
   <Container maxWidth="lg">
    <Grid
     container
     direction="row"
     justifyContent="center"
     alignItems="stretch"
     spacing={3}
    >
     <Grid item xs={12}>
      <Card>
       <CardHeader title="Lista de Editoriales" />
       <Divider />
       <TableContainer>
        <Table>
         <TableHead>
          <TableRow>
           <TableCell>ID</TableCell>
           <TableCell>Nombre</TableCell>
           <TableCell>Descripción</TableCell>
           <TableCell align="center">Acciones</TableCell>
          </TableRow>
         </TableHead>
         <TableBody>
          {data?.map((row) => (
           <TableRow key={row._id}>
            <TableCell component="th" scope="row">
             {row._id}
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="center">
             <Tooltip title="Editar Autor" arrow>
              <IconButton
               sx={{
                '&:hover': {
                 background: theme.colors.primary.lighter
                },
                color: theme.palette.primary.main
               }}
               color="inherit"
               size="small"
               onClick={() =>
                navigate(`/mantenimientos/editorial/${row._id}`, {
                 replace: true
                })
               }
              >
               <EditTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
             <Tooltip title="Eliminar editorial" arrow>
              <IconButton
               sx={{
                '&:hover': { background: theme.colors.error.lighter },
                color: theme.palette.error.main
               }}
               color="inherit"
               size="small"
               onClick={() => {
                setRowSelect(row);
                dispatch(setDeleteModal(true));
               }}
              >
               <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
            </TableCell>
           </TableRow>
          ))}
         </TableBody>
        </Table>
       </TableContainer>
      </Card>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />

   {isDeleteModal && (
    <DeleteDialog
     open={isDeleteModal}
     handleClose={() => dispatch(setDeleteModal(false))}
     handleDelete={() => {
        deleteEditorial({ _id: rowSelect._id });
     }}
     subtitle={rowSelect.name}
    />
   )}
  </>
 );
};

export default ScreenEditorial;
