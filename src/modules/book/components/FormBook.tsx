import {
 Autocomplete,
 Box,
 Button,
 CardContent,
 Grid,
 TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from 'src/store/useRedux';
import {
 usePostBookMutation,
 useUpdateBookMutation
} from '../slice/bookApiSlice';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetAuthorsQuery } from 'src/modules/authors/slice/authorApiSlice';
import { useGetCategoryQuery } from 'src/modules/category/slice/categoryApiSlice';
import { useGetEditorialsQuery } from 'src/modules/editorial/slice/editorialApiSlice';
import { Author } from '../interface/book.inteface';

interface Props {
 edit?: true;
}

interface InitialValues {
  isbn: string,
  name: string,
  edition: string,
  author: Author | null,
  category: Author | null,
  editorial: Author | null,
  observation: string
}

const FormBook = ({ edit }: Props) => {
 const { book } = useAppSelector((state) => state.book);
 const { idBook } = useParams();
 const navigate = useNavigate();

 const updateBook = book?.find(({ _id }) => _id === idBook);

 const { data: dataAuthors = [], isLoading: isLoadingAuthors } =
  useGetAuthorsQuery();
 const { data: dataCategories = [], isLoading: isLoadingCategories } =
  useGetCategoryQuery();
 const { data: dataEditorials, isLoading: isLoadingEditorials } =
  useGetEditorialsQuery();

 const [newBookMutation, { isLoading }] = usePostBookMutation();

 const [updateBookMutation, { isLoading: isLoadingUpdate }] =
  useUpdateBookMutation();

 const { handleSubmit, handleChange, setFieldValue, touched, errors, values } =
  useFormik<InitialValues>({
   initialValues: {
    isbn: edit ? updateBook?.isbn : '',
    name: edit ? updateBook?.name : '',
    edition: edit ? updateBook?.edition : '',
    author: updateBook?.author,
    category: updateBook?.category,
    editorial: updateBook?.editorial,
    observation: edit ? updateBook?.observation : ''
   },
   // validationSchema: validationEditorialSchema,
   onSubmit: async (values) => {
    console.log(values);
    //  edit
    //   ? await updateBookMutation({
    //      book: { ...values },
    //      _id: idBook
    //     })
    //   : await newBookMutation({ book: { ...values } });
   }
  });
 return (
  <CardContent>
   <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
    <Grid container item gap={3} sm={6}>
     <TextField
      id="isbn"
      name="isbn"
      label="ISBN"
      value={values.isbn}
      onChange={handleChange}
      error={touched.isbn && Boolean(errors.isbn)}
      helperText={touched.isbn && errors.isbn}
      fullWidth
      multiline
     />
     <TextField
      id="name"
      name="name"
      label="Nombre"
      value={values.name}
      onChange={handleChange}
      error={touched.name && Boolean(errors.name)}
      helperText={touched.name && errors.name}
      fullWidth
     />
     <TextField
      id="edition"
      name="edition"
      label="Edición"
      value={values.edition}
      onChange={handleChange}
      error={touched.edition && Boolean(errors.edition)}
      helperText={touched.edition && errors.edition}
      fullWidth
     />
     {dataAuthors && (
      <Autocomplete
       id="author"
       options={dataAuthors}
       fullWidth
       loading={isLoadingAuthors}
       onChange={(_, value) => setFieldValue('author', value || '')}
       getOptionLabel={(option) => option.name}
       renderInput={(params) => (
        <TextField
         {...params}
         label="Autor"
         error={touched.author && Boolean(errors.author)}
         helperText={touched.author && errors.author}
        />
       )}
      />
     )}
     <Autocomplete
      id="category"
      options={dataCategories}
      fullWidth
      loading={isLoadingCategories}
      onChange={(_, value) => setFieldValue('category', value || '')}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
       <TextField
        {...params}
        label="Categoria"
        error={touched.category && Boolean(errors.category)}
        helperText={touched.category && errors.category}
       />
      )}
     />
     <Autocomplete
      options={dataEditorials}
      id="editorial"
      fullWidth
      loading={isLoadingEditorials}
      onChange={(_, value) => setFieldValue('editorial', value || '')}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
       <TextField
        {...params}
        label="Editorial"
        error={touched.editorial && Boolean(errors.editorial)}
        helperText={touched.editorial && errors.editorial}
       />
      )}
     />
     <TextField
      id="observation"
      name="observation"
      label="Observación"
      value={values.observation}
      onChange={handleChange}
      error={touched.observation && Boolean(errors.observation)}
      helperText={touched.observation && errors.observation}
      fullWidth
      multiline
     />
     <Grid container item gap={2} justifyContent={'right'}>
      <Button
       type="submit"
       variant="contained"
       color="secondary"
       disabled={isLoading || isLoadingUpdate}
       startIcon={<ArrowBackIcon fontSize="small" />}
       onClick={() => navigate('/mantenimientos/book', { replace: true })}
      >
       Regresar
      </Button>
      <Button
       type="submit"
       variant="contained"
       disabled={isLoading || isLoadingUpdate}
       startIcon={<SaveIcon fontSize="small" />}
      >
       Guardar
      </Button>
     </Grid>
    </Grid>
   </Box>
  </CardContent>
 );
};

export default FormBook;
