import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { Book, BookPayload } from '../interface/book.inteface';
import { setBook } from './bookSlice';

const apiBookTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Book']
});

export const bookApi = apiBookTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list books
   */
  getBooks: builder.query<Book[], void>({
   queryFn: async (_, { dispatch }) => {
    try {
     const { data } = await mainApi.get<Book[]>('/book');

     dispatch(setBook(data));
     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   providesTags: (result) =>
    result
     ? [
        ...result.map(({ _id }) => ({ type: 'Book' as const, _id })),
        { type: 'Book', _id: 'LIST' }
       ]
     : [{ type: 'Book', _id: 'LIST' }]
  }),

  postBook: builder.mutation<Book, { book: BookPayload }>({
   queryFn: async ({ book }) => {
    try {
     const { data } = await mainApi.post('/book', { ...book });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Book', _id: 'LIST' }]
  }),

  updateBook: builder.mutation<Book, { book: BookPayload; _id: String }>({
   queryFn: async ({ book, _id }) => {
    try {
     const { data } = await mainApi.put(`/book/${_id}`, { ...book });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Book', _id: 'LIST' }]
  }),

  deleteBook: builder.mutation<Book, { _id: String }>({
   queryFn: async ({ _id }) => {
    try {
     const { data } = await mainApi.delete(`/book/${_id}`);

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Book', _id: 'LIST' }]
  })
 })
});

export const {
 useGetBooksQuery,
 useUpdateBookMutation,
 usePostBookMutation,
 useDeleteBookMutation
} = bookApi;
