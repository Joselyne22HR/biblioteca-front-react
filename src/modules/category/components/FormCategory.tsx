import { Box, Button, CardContent, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from 'src/store/useRedux';
import {
 usePostCategoryMutation,
 useUpdateCategoryMutation
} from '../slice/categoryApiSlice';
import { validationCategorySchema } from '../validations/validationCategoryScheme';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
 edit?: true;
}

const FormCategory = ({ edit }: Props) => {
 const { category } = useAppSelector((state) => state.category);
 const { idCategory } = useParams();
 const navigate = useNavigate();

 const updateCategory = category?.find(({ _id }) => _id === idCategory);

 const [newCategoryMutation, { isLoading }] = usePostCategoryMutation();

 const [updateCategoryMutation, { isLoading: isLoadingUpdate }] =
  useUpdateCategoryMutation();

 const { handleSubmit, handleChange, touched, errors, values } = useFormik({
  initialValues: {
   name: edit ? updateCategory?.name : '',
   description: edit ? updateCategory?.description : ''
  },
  validationSchema: validationCategorySchema,
  onSubmit: async ({ name, description }) => {
   edit
    ? await updateCategoryMutation({
       category: { name, description },
       _id: idCategory
      })
    : await newCategoryMutation({ category: { name, description } });
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
       onClick={() => navigate('/mantenimientos/category', { replace: true })}
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

export default FormCategory;
