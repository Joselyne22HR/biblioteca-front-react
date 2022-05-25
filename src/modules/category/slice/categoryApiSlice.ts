import mainApi from 'src/api/mainApi';
import { bibliotecaApi } from 'src/store/bibliotecaApi';
import { Category } from '../interface/category.interface';
import { setCategory } from './categorySlice';

const apiCategoryTags = bibliotecaApi.enhanceEndpoints({
 addTagTypes: ['Category']
});

export const categoryApi = apiCategoryTags.injectEndpoints({
 endpoints: (builder) => ({
  /**
   * @GET list category
   */
  getCategory: builder.query<Category[], void>({
   queryFn: async (_, { dispatch }) => {
    try {
     const { data } = await mainApi.get<Category[]>('/category');

     dispatch(setCategory(data));
     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   providesTags: (result) =>
    result
     ? [
        ...result.map(({ _id }) => ({ type: 'Category' as const, _id })),
        { type: 'Category', _id: 'LIST' }
       ]
     : [{ type: 'Category', _id: 'LIST' }]
  }),

  postCategory: builder.mutation<Category, { category: Partial<Category> }>({
   queryFn: async ({ category }) => {
    try {
     const { data } = await mainApi.post('/category', { ...category });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Category', _id: 'LIST' }]
  }),

  updateCategory: builder.mutation<
   Category,
   { category: Partial<Category>; _id: String }
  >({
   queryFn: async ({ category, _id }) => {
    try {
     const { data } = await mainApi.put(`/category/${_id}`, { ...category });

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Category', _id: 'LIST' }]
  }),

  deleteCategory: builder.mutation<Category, { _id: String }>({
   queryFn: async ({ _id }) => {
    try {
     const { data } = await mainApi.delete(`/category/${_id}`);

     return { data };
    } catch (error: any) {
     return { error };
    }
   },
   invalidatesTags: [{ type: 'Category', _id: 'LIST' }]
  })
 })
});

export const {
 useGetCategoryQuery,
 usePostCategoryMutation,
 useUpdateCategoryMutation,
 useDeleteCategoryMutation
} = categoryApi;
