import * as yup from 'yup';

export const validationCategorySchema = yup.object({
 name: yup.string().required('Nombre requerido.'),
 description: yup.string().required('Descripción requerido.')
});