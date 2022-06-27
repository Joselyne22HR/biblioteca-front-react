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
 Stack,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 TextField,
 Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FooterPage from 'src/shared/FooterPage';
import { useEffect, useState } from 'react';
import { useLazyGetStudentByIdentificationQuery } from 'src/modules/student/slice/studenApiSlice';
import { StudentResponse } from 'src/modules/student/interface/types';
import { useGetBooksQuery } from 'src/modules/book/slice/bookApiSlice';
import { BookResponse } from 'src/modules/stock/interface/types';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { usePostLoanMutation } from '../slice/loanApiSlice';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

const ScreenToLoan = () => {
 const [identification, setIdentification] = useState<string>();
 const [isbn, setIsbn] = useState<string>();
 const [booksToAdd, setBooksToAdd] = useState<BookResponse[]>([]);
 const [errorFindBook, setErrorFindBook] = useState<boolean>(false);
 const [student, setStudent] = useState<StudentResponse | undefined>();
 const [dateEnd, setDateEnd] = useState<string>();
 const navigate = useNavigate();

 const [getStudent, { data, isLoading, isSuccess, isError }] =
  useLazyGetStudentByIdentificationQuery();
 const handleSearchStudent = async () => {
  await getStudent({ id: identification });
 };

 const { data: books } = useGetBooksQuery();

 useEffect(() => {
  if (data) {
   setStudent(data?.find((d) => d.identification === identification));
  }
 }, [data, identification]);

 const handleAddBook = () => {
  setErrorFindBook(false);
  const bookFind = books.find((b) => b.isbn === isbn);
  if (bookFind) setBooksToAdd([...booksToAdd, bookFind]);
  else setErrorFindBook(true);
 };

 const [saveLoan, { isLoading: isLoadingSave }] = usePostLoanMutation();

 const handleSave = () => {
  saveLoan({
   loan: {
    code: Date.now().toString(),
    book: booksToAdd[0]._id,
    start: format(new Date(), 'dd/MM/yyyy'),
    end: format(new Date(dateEnd), 'dd/MM/yyyy'),
    student: student._id,
    status: true
   }
  });
 };

 console.log(booksToAdd);

 const handleNavigation = () => {
  navigate('/mantenimientos/loans/list', { replace: true });
 };

 return (
  <>
   <Helmet>
    <title>Préstamos</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Préstamos'}
     subtitle={'Aquí podrás realizar el préstamos de un libro.'}
     buttonTitle={'Listado de Préstamos'}
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
       <CardHeader title="Detalle" />
       <Divider />
       <CardContent component={Grid} xs={12}>
        <Grid container>
         <TextField
          id="identification"
          name="identification"
          label="Cédula"
          value={identification}
          onChange={(e) => setIdentification(e.target.value)}
         />
         <IconButton
          aria-label="buscar"
          size="large"
          onClick={handleSearchStudent}
         >
          {isLoading ? <CircularProgress /> : <SearchIcon />}
         </IconButton>
         {isSuccess && (
          <Grid item marginLeft={3}>
           <Typography variant="body1">Estudiante: </Typography>
           <Typography variant="body1">{student?.name}</Typography>
          </Grid>
         )}
         {isError && (
          <Grid item>
           <Typography>Estudiante no encontrado</Typography>
          </Grid>
         )}
        </Grid>

        <Grid container marginTop={2}>
         <TextField
          id="isbn"
          name="isbn"
          label="Isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          helperText={
           errorFindBook && (
            <Typography color={'red'}>Libro no encontrado</Typography>
           )
          }
         />
         <IconButton aria-label="buscar" size="large" onClick={handleAddBook}>
          {isLoading ? <CircularProgress /> : <AddCircleIcon />}
         </IconButton>
        </Grid>

        <Grid container marginTop={2}>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
           <DesktopDatePicker
            label="Hasta"
            inputFormat="dd/MM/yyyy"
            value={dateEnd}
            onChange={(value) => setDateEnd(value)}
            renderInput={(params) => <TextField {...params} />}
           />
          </Stack>
         </LocalizationProvider>
        </Grid>
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
          </TableRow>
         </TableHead>
         <TableBody>
          {booksToAdd?.map((row) => (
           <TableRow key={row._id}>
            <TableCell component="th" scope="row">
             {row.isbn}
            </TableCell>
            <TableCell component="th" scope="row">
             {row.name}
            </TableCell>
            <TableCell align="left">{row.author.name}</TableCell>
           </TableRow>
          ))}
         </TableBody>
        </Table>
       </TableContainer>
      </Card>
      <Grid marginTop={2} container justifyContent={'flex-end'}>
       <Button
        variant="contained"
        disabled={isLoadingSave}
        startIcon={
         isLoadingSave ? <CircularProgress /> : <SaveIcon fontSize="small" />
        }
        onClick={handleSave}
       >
        Guardar
       </Button>
      </Grid>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default ScreenToLoan;
