import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { Author } from '../interface/author.interface';
import { setAuthors } from './authorSlice';

const apiAuthorTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Authors']
});

export const authorApi = apiAuthorTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list authors
   */
  getAuthors: builder.query<Author[], void>({
   queryFn: async (_, { dispatch }) => {
    try {
     const { data } = await mainApi.get<Author[]>('/author');

     dispatch(setAuthors(data));
     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   providesTags: (result) =>
    result
     ? [
        ...result.map(({ _id }) => ({ type: 'Authors' as const, _id })),
        { type: 'Authors', _id: 'LIST' }
       ]
     : [{ type: 'Authors', _id: 'LIST' }]
  }),

  postAuthor: builder.mutation<Author, { author: Partial<Author> }>({
   queryFn: async ({ author }) => {
    try {
     const { data } = await mainApi.post('/author', { ...author });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Authors', _id: 'LIST' }]
  }),

  updateAuthor: builder.mutation<
   Author,
   { author: Partial<Author>; _id: String }
  >({
   queryFn: async ({ author, _id }) => {
    try {
     const { data } = await mainApi.put(`/author/${_id}`, { ...author });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Authors', _id: 'LIST' }]
  }),

  deleteAuthor: builder.mutation<Author, { _id: String }>({
   queryFn: async ({ _id }) => {
    try {
     const { data } = await mainApi.delete(`/author/${_id}`);

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Authors', _id: 'LIST' }]
  })
 })
});

export const {
 useGetAuthorsQuery,
 usePostAuthorMutation,
 useUpdateAuthorMutation,
 useDeleteAuthorMutation
} = authorApi;
