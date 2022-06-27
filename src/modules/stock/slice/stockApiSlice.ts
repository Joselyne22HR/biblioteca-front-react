import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { BookResponse, StockPayload, StockResponse } from '../interface/types';

const apiStockTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Stock']
});

export const stockApi = apiStockTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list editorial
   */
  getBookByIsbn: builder.query<BookResponse[], { isbn: string }>({
   queryFn: async ({ isbn }) => {
    try {
     const { data } = await mainApi.get<BookResponse[]>('/book', {
      params: isbn
     });

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

  postStock: builder.mutation<StockResponse, { stock: StockPayload }>({
   queryFn: async ({ stock }) => {
    try {
     const { data } = await mainApi.post('/stock', { ...stock });

     return { data };
    } catch (error: any) {
     return { error };
    }
   }
  })
 })
});

export const {
 useGetBookByIsbnQuery,
 useLazyGetBookByIsbnQuery,
 usePostStockMutation
} = stockApi;
