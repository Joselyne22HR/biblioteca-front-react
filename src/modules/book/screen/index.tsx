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
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import DeleteDialog from 'src/shared/DeleteDialog';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDeleteBookMutation, useGetBooksQuery } from '../slice/bookApiSlice';
import { useAppDispatch, useAppSelector } from 'src/store/useRedux';
import { useNavigate } from 'react-router';
import { setDeleteModal } from '../slice/bookSlice';
import { useEffect, useState } from 'react';
import { Book } from '../interface/book.inteface';

const ScreenBook = () => {
 const theme = useTheme();
 const dispatch = useAppDispatch();
 const { isDeleteModal } = useAppSelector((state) => state.book);
 const navigate = useNavigate();
 const handleCreate = () =>
  navigate('/mantenimientos/new-book', { replace: true });
 const [rowSelect, setRowSelect] = useState<Book>();

 const { data } = useGetBooksQuery();
 const [deleteEditorial, { isSuccess }] = useDeleteBookMutation();

 useEffect(() => {
  if (isSuccess) dispatch(setDeleteModal(false));
 }, [isSuccess, dispatch]);

 return (
  <>
   <Helmet>
    <title>Libro</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Libro'}
     subtitle={'Aquí podrás ver todos los libros disponibles.'}
     buttonTitle={'Crear libro'}
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
       <CardHeader title="Lista de Libros" />
       <Divider />
       <TableContainer>
        <Table>
         <TableHead>
          <TableRow>
           <TableCell>ISBN</TableCell>
           <TableCell>Nombre</TableCell>
           <TableCell>Edición</TableCell>
           <TableCell>Autor</TableCell>
           <TableCell>Categoria</TableCell>
           <TableCell>Editorial</TableCell>
           <TableCell>Observación</TableCell>
           <TableCell align="center">Acciones</TableCell>
          </TableRow>
         </TableHead>
         <TableBody>
          {data?.map((row) => (
           <TableRow key={row._id}>
            <TableCell align="left">{row.isbn}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.edition}</TableCell>
            <TableCell align="left">{row.author.name}</TableCell>
            <TableCell align="left">{row.category.name}</TableCell>
            <TableCell align="left">{row.editorial.name}</TableCell>
            <TableCell align="left">{row.observation}</TableCell>
            <TableCell align="center">
             <Tooltip title="Editar libro" arrow>
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
                navigate(`/mantenimientos/book/${row._id}`, {
                 replace: true
                })
               }
              >
               <EditTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
             <Tooltip title="Eliminar libro" arrow>
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

export default ScreenBook;
