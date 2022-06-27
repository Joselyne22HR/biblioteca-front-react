import {
 Button,
 Card,
 CardContent,
 CardHeader,
 CircularProgress,
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
 TextField,
 Typography
} from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import SearchIcon from '@mui/icons-material/Search';
import {
 useGetLoansQuery,
 usePostReturnsMutation
} from 'src/modules/toloan/slice/loanApiSlice';
import { LoanResponse } from 'src/modules/toloan/interface/types';
import SaveIcon from '@mui/icons-material/Save';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

const ScreenReturn = () => {
 const [code, setCode] = useState<string>();
 const [loans, setLoans] = useState<LoanResponse[]>([]);
 const [errorFind, setErrorFind] = useState<boolean>(false);
 const { data } = useGetLoansQuery();
 const navigate = useNavigate();

 const handleSearch = () => {
  setErrorFind(false);
  const find = data.find((d) => d.code === code);
  if (find) setLoans([find]);
  else setErrorFind(true);
 };

 const [saveReturns, { isLoading: isLoadingReturns }] =
  usePostReturnsMutation();

 const handleSave = () => {
  saveReturns({
   returns: {
    book: loans[0].book._id,
    student: loans[0].student._id,
    code: Date.now().toString(),
    date: format(new Date(), 'dd/MM/yyyy')
   }
  });
 };

 const handleNavigation = () => {
  navigate('/mantenimientos/returns/list', { replace: true });
 };
 return (
  <>
   <Helmet>
    <title>Devoluciones</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Devoluciones'}
     subtitle={'Aquí podrás realizar las devoluciones de los libros.'}
     buttonTitle={'Listado de Devoluciones'}
     handleClick={handleNavigation}
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
       <CardContent>
        <TextField
         id="code"
         name="code"
         label="Código"
         value={code}
         onChange={(e) => setCode(e.target.value)}
         helperText={
          errorFind && (
           <Typography color={'red'}>Préstamo no encontrado</Typography>
          )
         }
        />
        <IconButton aria-label="buscar" size="large" onClick={handleSearch}>
         <SearchIcon />
        </IconButton>
       </CardContent>
      </Card>
     </Grid>
     <Grid item xs={12}>
      <Card>
       <CardHeader title="Libro" />
       <Divider />
       <TableContainer>
        <Table>
         <TableHead>
          <TableRow>
           <TableCell>ISBN</TableCell>
           <TableCell>Nombre</TableCell>
           <TableCell>Autor</TableCell>
           <TableCell>Fecha de Préstamos</TableCell>
          </TableRow>
         </TableHead>
         <TableBody>
          {loans?.map((row) => (
           <TableRow key={row._id}>
            <TableCell component="th" scope="row">
             {row.book.isbn}
            </TableCell>
            <TableCell component="th" scope="row">
             {row.book.name}
            </TableCell>
            <TableCell align="left">{row.book.author.name}</TableCell>
            <TableCell align="left">{row.start}</TableCell>
           </TableRow>
          ))}
         </TableBody>
        </Table>
       </TableContainer>
      </Card>
      <Grid marginTop={2} container justifyContent={'flex-end'}>
       <Button
        variant="contained"
        disabled={isLoadingReturns}
        startIcon={
         isLoadingReturns ? <CircularProgress /> : <SaveIcon fontSize="small" />
        }
        onClick={handleSave}
       >
        Devolver
       </Button>
      </Grid>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default ScreenReturn;
