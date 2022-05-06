import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { Author } from '../interface/author.interface';

const apiAuthorTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Authors']
});

export const authorApi = apiAuthorTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list authors
   */
  getAuthors: builder.query<Author[], void>({
   queryFn: async () => {
    try {
     const { data } = await mainApi.get<Author[]>('/author');

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
   { author: Partial<Author>; id: String }
  >({
   queryFn: async ({ author, id }) => {
    try {
     const { data } = await mainApi.put(`/author/${id}`, { ...author });

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
 useUpdateAuthorMutation
} = authorApi;
