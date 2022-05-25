import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { Editorial } from '../interface/editorial.interface';
import { setEditorial } from './editorialSlice';

const apiEditorialTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Editorial']
});

export const editorialApi = apiEditorialTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list editorial
   */
  getEditorials: builder.query<Editorial[], void>({
   queryFn: async (_, {dispatch}) => {
    try {
     const { data } = await mainApi.get<Editorial[]>('/editorial');

     dispatch(setEditorial(data))
     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   providesTags: (result) =>
    result
     ? [
        ...result.map(({ _id }) => ({ type: 'Editorial' as const, _id })),
        { type: 'Editorial', _id: 'LIST' }
       ]
     : [{ type: 'Editorial', _id: 'LIST' }]
  }),

  postEditorial: builder.mutation<Editorial, { editorial: Partial<Editorial> }>(
   {
    queryFn: async ({ editorial }) => {
     try {
      const { data } = await mainApi.post('/editorial', { ...editorial });

      return { data };
     } catch (error: any) {
      return { error };
     }
    },
    invalidatesTags: [{ type: 'Editorial', _id: 'LIST' }]
   }
  ),

  updateEditorial: builder.mutation<
   Editorial,
   { editorial: Partial<Editorial>; _id: String }
  >({
   queryFn: async ({ editorial, _id }) => {
    try {
     const { data } = await mainApi.put(`/editorial/${_id}`, { ...editorial });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Editorial', _id: 'LIST' }]
  }),

  deleteEditorial: builder.mutation<Editorial, { _id: String }>({
   queryFn: async ({ _id }) => {
    try {
     const { data } = await mainApi.delete(`/editorial/${_id}`);

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Editorial', _id: 'LIST' }]
  })
 })
});

export const {
 useGetEditorialsQuery,
 useDeleteEditorialMutation,
 usePostEditorialMutation,
 useUpdateEditorialMutation
} = editorialApi;
