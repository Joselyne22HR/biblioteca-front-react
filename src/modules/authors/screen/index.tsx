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
import { useGetAuthorsQuery } from '../slice/authorApiSlice';
import { useEffect } from 'react';
import { useAppDispatch } from 'src/store/useRedux';
import { setAuthors } from '../slice/authorSlice';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const ScreenAuthor = () => {
 const theme = useTheme();
 const dispatch = useAppDispatch();
 const { data } = useGetAuthorsQuery();

 useEffect(() => {
  if (data) dispatch(setAuthors(data));
 }, [data, dispatch]);

 const navigate = useNavigate();
 const handleCreate = () =>
  navigate('/mantenimientos/new-autor', { replace: true });

 console.log(data);

 return (
  <>
   <Helmet>
    <title>Autor</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Autores'}
     subtitle={'Aquí podrás ver todos los autores disponibles..'}
     buttonTitle={'Crear autor'}
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
       <CardHeader title="Lista de Autores" />
       <Divider />
       <TableContainer>
        <Table>
         <TableHead>
          <TableRow>
           <TableCell>ID</TableCell>
           <TableCell>Nombre y Apellido</TableCell>
           <TableCell>Edad</TableCell>
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
            <TableCell align="left">{row.gender}</TableCell>
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
                navigate(`/mantenimientos/autor/${row._id}`, { replace: true })
               }
              >
               <EditTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
             <Tooltip title="Eliminar Autor" arrow>
              <IconButton
               sx={{
                '&:hover': { background: theme.colors.error.lighter },
                color: theme.palette.error.main
               }}
               color="inherit"
               size="small"
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
  </>
 );
};

export default ScreenAuthor;
