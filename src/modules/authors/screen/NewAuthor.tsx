import {
 Box,
 Button,
 Card,
 CardContent,
 CardHeader,
 Container,
 Divider,
 Grid,
 TextField,
 Autocomplete
} from '@mui/material';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FooterPage from 'src/shared/FooterPage';
import PrincipalHeader from 'src/shared/PrincipalHeader';
import { validationAuthorSchema } from '../validations/validationSchema';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePostAuthorMutation } from '../slice/authorApiSlice';

const NewAuthor = () => {
 const [newAuthorMutation, { isLoading }] = usePostAuthorMutation();

 const { handleSubmit, handleChange, touched, errors, values, setFieldValue } =
  useFormik({
   initialValues: {
    name: '',
    gender: ''
   },
   validationSchema: validationAuthorSchema,
   onSubmit: async ({name, gender}) => {
    //    console.log(author)
    await newAuthorMutation({ author: {name, gender} });
   }
  });
 return (
  <>
   <Helmet>
    <title>Nuevo autor</title>
   </Helmet>
   <PageTitleWrapper>
    <PrincipalHeader
     title={'Autor'}
     subtitle={'Aquí podrás craer un nuevo autor.'}
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
       <CardHeader title="Crear nuevo autor" />
       <Divider />
       <CardContent>
        <Box
         component="form"
         //  sx={{
         //   '& .MuiTextField-root': { m: 1, width: '25ch' },
         // //   '& .MuiAutocomplete-root': { m: 1, width: '25ch' }
         //  }}
         noValidate
         autoComplete="off"
         onSubmit={handleSubmit}
        >
         <Grid container item gap={3} sm={6}>
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
          <Autocomplete
           options={['Femenino', 'Masculino']}
           id="gender"
           fullWidth
           onChange={(_, value) => setFieldValue('gender', value || '')}
           renderInput={(params) => (
            <TextField
             {...params}
             label="Género"
             error={touched.gender && Boolean(errors.gender)}
             helperText={touched.gender && errors.gender}
            />
           )}
          />
          <Grid container item gap={2} justifyContent={'right'}>
           <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
            startIcon={<ArrowBackIcon fontSize="small" />}
           >
            Regresar
           </Button>
           <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={<SaveIcon fontSize="small" />}
           >
            Guardar
           </Button>
          </Grid>
         </Grid>
        </Box>
       </CardContent>
      </Card>
     </Grid>
    </Grid>
   </Container>
   <FooterPage />
  </>
 );
};

export default NewAuthor;
