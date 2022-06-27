import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { StudentResponse } from '../interface/types';

const apiStudentTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Loan']
});

export const studentApi = apiStudentTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list editorial
   */
  getStudentByIdentification: builder.query<StudentResponse[], { id: string }>({
   queryFn: async ({ id }) => {
    try {
     const { data } = await mainApi.get<StudentResponse[]>('/student', {
      params: { identification: id }
     });

     return { data };
    } catch (error: any) {
     return { error };
    }
   }
  })
 })
});

export const { useLazyGetStudentByIdentificationQuery } = studentApi;
