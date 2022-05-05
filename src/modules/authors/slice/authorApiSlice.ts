import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { Author } from '../interface/author.interface';

export const authorApi = bibliotecaApi.injectEndpoints({
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
   }
  }),

  postAuthor: builder.mutation<Author, { author: Partial<Author> }>({
   queryFn: async ({ author }) => {
    try {
     const { data } = await mainApi.post('/author', { ...author });

     return { data };
    } catch (error: any) {
     return { error };
    }
   }
  })
 }),
});

export const { useGetAuthorsQuery, usePostAuthorMutation } = authorApi;
