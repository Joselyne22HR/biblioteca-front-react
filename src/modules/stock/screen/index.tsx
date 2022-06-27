import {
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
 //  Tooltip,
 //  useTheme
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import {
 usePostStockMutation
} from '../slice/stockApiSlice';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { BookResponse } from '../interface/types';
import { useGetBooksQuery } from 'src/modules/book/slice/bookApiSlice';

const StockScreen = () => {
 // const theme = useTheme()
 const [isbn, setIsbn] = useState<string>('');
 const [stockToSave, setStockToSave] = useState<number>();
 const { data } = useGetBooksQuery();
 const [saveStock, { isLoading }] = usePostStockMutation();
 const [findBook, setFindBook] = useState<BookResponse[]>([]);
 const [errorFind, setErrorFind] = useState<boolean>(false);

 console.log('book', data);

 const handleSearch = async () => {
  setErrorFind(false);
//   await getBook({ isbn });
  const find = data?.find((d) => d.isbn === isbn);
  if (find) setFindBook([find]);
  else setErrorFind(true);
 };

 const handleStock = async (bookId: string) => {
  await saveStock({
   stock: { book: bookId, stock: stockToSave, current: stockToSave }
  });
 };

 return (
  <>
   <Helmet>
    <title>Inventario</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Inventario'}
     subtitle={'Aquí podrás ver el stock de todos los libros.'}
     //  buttonTitle={'Crear editorial'}
     //  handleClick={handleCreate}
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
         id="isbn"
         name="isbn"
         label="ISBN"
         value={isbn}
         onChange={(e) => setIsbn(e.target.value)}
         helperText={
            errorFind && (
             <Typography color={'red'}>Libro no encontrado</Typography>
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
           <TableCell>Edición</TableCell>
           <TableCell>Autor</TableCell>
           <TableCell align="center">Stock</TableCell>
          </TableRow>
         </TableHead>
         <TableBody>
          {findBook?.map((row) => (
           <TableRow key={row._id}>
            <TableCell component="th" scope="row">
             {row.isbn}
            </TableCell>
            <TableCell component="th" scope="row">
             {row.name}
            </TableCell>
            <TableCell align="left">{row.edition}</TableCell>
            <TableCell align="left">{row.author.name}</TableCell>
            <TableCell align="center">
             <TextField
              id="stock"
              name="stock"
              label="Stock"
              value={stockToSave}
              onChange={(e) => setStockToSave(Number(e.target.value))}
             />
             <IconButton
              aria-label="save"
              size="large"
              onClick={() => handleStock(row._id)}
             >
              {isLoading ? <CircularProgress /> : <SaveIcon />}
             </IconButton>
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

export default StockScreen;
