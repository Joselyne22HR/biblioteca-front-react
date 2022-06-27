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
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useGetReturnsQuery } from 'src/modules/toloan/slice/loanApiSlice';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';

const TableReturns = () => {
 const { data } = useGetReturnsQuery();
 return (
  <>
   <Helmet>
    <title>Préstamos</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Devoluciones'}
     subtitle={'Aquí podrás ver el listado de devoluciones.'}
     //   buttonTitle={'Listado de Prestamos'}
     //   handleClick={handleNavigation}
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
       <CardHeader title="Libro" />
       <Divider />
       <TableContainer>
        <Table>
         <TableHead>
          <TableRow>
           <TableCell>Código de Devolución</TableCell>
           <TableCell>ISBN</TableCell>
           <TableCell>Libro</TableCell>
           <TableCell>Autor</TableCell>
           <TableCell>Fecha de Devolución</TableCell>
           {/* <TableCell>Estado</TableCell> */}
          </TableRow>
         </TableHead>
         <TableBody>
          {data?.map((row) => (
           <TableRow key={row._id}>
            <TableCell component="th" scope="row">
             {row.code}
            </TableCell>
            <TableCell component="th" scope="row">
             {row.book.isbn}
            </TableCell>
            <TableCell align="left">{row.book.name}</TableCell>
            <TableCell align="left">{row.book.author.name}</TableCell>
            <TableCell align="left">{row.date}</TableCell>
            {/* <TableCell align="left">{row.status? 'Activo': 'Inactivo'}</TableCell> */}
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

export default TableReturns;
