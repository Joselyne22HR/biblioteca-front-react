import {
 Card,
 CardHeader,
 Container,
 Divider,
 Grid,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import { useGetAuthorsQuery } from '../slice/authorApiSlice';

const ScreenAuthor = () => {
 const { data } = useGetAuthorsQuery();

 const navigate = useNavigate();
 const handleCreate = () => navigate('/mantenimientos/new-autor', { replace: true })

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
           <TableCell>Acciones</TableCell>
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
