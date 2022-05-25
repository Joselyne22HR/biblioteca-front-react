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
import PrincipalHeader from 'src/shared/PrincipalHeader';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useAppDispatch, useAppSelector } from 'src/store/useRedux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Category } from '../interface/category.interface';
import FooterPage from 'src/shared/FooterPage';
import DeleteDialog from 'src/shared/DeleteDialog';
import { setDeleteModal } from '../slice/categorySlice';
import {
 useDeleteCategoryMutation,
 useGetCategoryQuery
} from '../slice/categoryApiSlice';

const ScreenCategory = () => {
 const theme = useTheme();
 const dispatch = useAppDispatch();
 const navigate = useNavigate();

 const { isDeleteModal } = useAppSelector((state) => state.category);

 const [rowSelect, setRowSelect] = useState<Category>();

 const handleCreate = () =>
  navigate('/mantenimientos/new-category', { replace: true });

 const { data } = useGetCategoryQuery();
 const [deleteCategory, { isSuccess }] = useDeleteCategoryMutation();

 useEffect(() => {
  if (isSuccess) dispatch(setDeleteModal(false));
 }, [isSuccess, dispatch]);

 return (
  <>
   <Helmet>
    <title>Categoria</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Categoria'}
     subtitle={'Aquí podrás ver todos las categorias disponibles.'}
     buttonTitle={'Crear categoria'}
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
       <CardHeader title="Lista de Categoria" />
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
             <Tooltip title="Editar categoria" arrow>
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
                navigate(`/mantenimientos/category/${row._id}`, {
                 replace: true
                })
               }
              >
               <EditTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
             <Tooltip title="Eliminar categoria" arrow>
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
      deleteCategory({ _id: rowSelect._id });
     }}
     subtitle={rowSelect.name}
    />
   )}
  </>
 );
};

export default ScreenCategory;
