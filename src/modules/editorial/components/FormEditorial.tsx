import { Button, CardContent, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from 'src/store/useRedux';
import {
 usePostEditorialMutation,
 useUpdateEditorialMutation
} from '../slice/editorialApiSlice';
import { validationEditorialSchema } from '../validations/validationEditorialSchema';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
 edit?: true;
}

const FormEditorial = ({ edit }: Props) => {
 const { editorial } = useAppSelector((state) => state.editorial);
 const { idEditorial } = useParams();
 const navigate = useNavigate();

 const updateEditorial = editorial?.find(({ _id }) => _id === idEditorial);

 const [newEditorialMutation, { isLoading }] = usePostEditorialMutation();

 const [updateEditorialMutation, { isLoading: isLoadingUpdate }] =
  useUpdateEditorialMutation();

 const { handleSubmit, handleChange, touched, errors, values } =
  useFormik({
   initialValues: {
    name: edit ? updateEditorial?.name : '',
    description: edit ? updateEditorial?.description : ''
   },
   validationSchema: validationEditorialSchema,
   onSubmit: async ({ name, description }) => {
    edit
     ? await updateEditorialMutation({
        editorial: { name, description },
        _id: idEditorial
       })
     : await newEditorialMutation({ editorial: { name, description } });
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
     <TextField
      id="description"
      name="description"
      label="Descripción"
      value={values.description}
      onChange={handleChange}
      error={touched.description && Boolean(errors.description)}
      helperText={touched.description && errors.description}
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
       onClick={() => navigate('/mantenimientos/editorial', { replace: true })}
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

export default FormEditorial;
