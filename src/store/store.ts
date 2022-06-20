import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { bibliotecaApi } from './bibliotecaApi';
//Reducers
import authorReducer from 'src/modules/authors/slice/authorSlice';
import editorialReducer from 'src/modules/editorial/slice/editorialSlice';
import categoryReducer from 'src/modules/category/slice/categorySlice';
import bookReducer from 'src/modules/book/slice/bookSlice';
//ApiSlice
import { authorApi } from 'src/modules/authors/slice/authorApiSlice';
import { editorialApi } from 'src/modules/editorial/slice/editorialApiSlice';
import { categoryApi } from 'src/modules/category/slice/categoryApiSlice';
import { bookApi } from 'src/modules/book/slice/bookApiSlice';

export const store = configureStore({
 reducer: {
  [authorApi.reducerPath]: authorApi.reducer,
  [editorialApi.reducerPath]: editorialApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  author: authorReducer,
  editorial: editorialReducer,
  category: categoryReducer,
  book: bookReducer,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(bibliotecaApi.middleware)
});

setupListeners(store.dispatch);

// root redux types based on store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
