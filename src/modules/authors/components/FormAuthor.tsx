import {
 Autocomplete,
 Button,
 CardContent,
 Grid,
 TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import {
 usePostAuthorMutation,
 useUpdateAuthorMutation
} from '../slice/authorApiSlice';
import { validationAuthorSchema } from '../validations/validationSchema';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router';
import { useAppSelector } from 'src/store/useRedux';

interface Props {
 edit?: true;
}

const FormAuthor = ({ edit }: Props) => {
 const { author } = useAppSelector((state) => state.author);
 const { idAuthor } = useParams();
 const navigate = useNavigate();

 const updateAuthor = author?.find(({ _id }) => _id === idAuthor);

 const [newAuthorMutation, { isLoading }] = usePostAuthorMutation();

 const [updateAuthorMutation, { isLoading: isLoadingUpdate }] =
  useUpdateAuthorMutation();

 const { handleSubmit, handleChange, touched, errors, values, setFieldValue } =
  useFormik({
   initialValues: {
    name: edit ? updateAuthor?.name : '',
    gender: edit ? updateAuthor?.gender : ''
   },
   validationSchema: validationAuthorSchema,
   onSubmit: async ({ name, gender }) => {
    edit
     ? await updateAuthorMutation({ author: { name, gender }, _id: idAuthor })
     : await newAuthorMutation({ author: { name, gender } });
   }
  });
 return (
  <CardContent>
   <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
      defaultValue={edit ? updateAuthor?.gender : undefined}
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
       disabled={isLoading || isLoadingUpdate}
       startIcon={<ArrowBackIcon fontSize="small" />}
       onClick={() => navigate('/mantenimientos/autor', { replace: true })}
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

export default FormAuthor;
