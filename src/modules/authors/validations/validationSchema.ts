import * as yup from 'yup';

export const validationAuthorSchema = yup.object({
 name: yup.string().required('Nombre requrido.'),
 gender: yup.string().required('Género requerido.')
});

// export default validationAuthorSchema