import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import {
 LoanPayload,
 LoanResponse,
 ReturnsPayload,
 ReturnsResponse,
} from '../interface/types';

const apiLoanTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Loan', 'Returns']
});

export const loanApi = apiLoanTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list editorial
   */
  postLoan: builder.mutation<LoanResponse, { loan: LoanPayload }>({
   queryFn: async ({ loan }) => {
    try {
     const { data } = await mainApi.post<LoanResponse>('/loan', { ...loan });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Loan', _id: 'LIST' }]
  }),

  /**
   * @GET list editorial
   */
  getLoans: builder.query<LoanResponse[], void>({
   queryFn: async () => {
    try {
     const { data } = await mainApi.get<LoanResponse[]>('/loan');

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   providesTags: (result) =>
    result
     ? [
        ...result.map(({ _id }) => ({ type: 'Loan' as const, _id })),
        { type: 'Loan', _id: 'LIST' }
       ]
     : [{ type: 'Loan', _id: 'LIST' }]
  }),
  /**
   * @GET list editorial
   */
  postReturns: builder.mutation<ReturnsPayload, { returns: ReturnsPayload }>({
   queryFn: async ({ returns }) => {
    try {
     const { data } = await mainApi.post<ReturnsPayload>('/returns', {
      ...returns
     });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Returns', _id: 'LIST' }]
  }),

  getReturns: builder.query<ReturnsResponse[], void>({
   queryFn: async () => {
    try {
     const { data } = await mainApi.get<ReturnsResponse[]>('/returns');

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   providesTags: (result) =>
    result
     ? [
        ...result.map(({ _id }) => ({ type: 'Returns' as const, _id })),
        { type: 'Returns', _id: 'LIST' }
       ]
     : [{ type: 'Returns', _id: 'LIST' }]
  })
 })
});

export const {
 usePostLoanMutation,
 useLazyGetLoansQuery,
 useGetLoansQuery,
 usePostReturnsMutation,
 useGetReturnsQuery
} = loanApi;
