import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { bibliotecaApi } from './bibliotecaApi';
//Reducers
import authorReducer from 'src/modules/authors/slice/authorSlice';
import editorialReducer from 'src/modules/editorial/slice/editorialSlice';
import categoryReducer from 'src/modules/category/slice/categorySlice';
import bookReducer from 'src/modules/book/slice/bookSlice';
import stockReducer from 'src/modules/stock/slice/stockSlice';
import studentReducer from 'src/modules/student/slice/studentSlice';
//ApiSlice
import { authorApi } from 'src/modules/authors/slice/authorApiSlice';
import { editorialApi } from 'src/modules/editorial/slice/editorialApiSlice';
import { categoryApi } from 'src/modules/category/slice/categoryApiSlice';
import { bookApi } from 'src/modules/book/slice/bookApiSlice';
import { stockApi } from 'src/modules/stock/slice/stockApiSlice';
import { studentApi } from 'src/modules/student/slice/studenApiSlice';
import { loanApi } from 'src/modules/toloan/slice/loanApiSlice';

export const store = configureStore({
 reducer: {
  [authorApi.reducerPath]: authorApi.reducer,
  [editorialApi.reducerPath]: editorialApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [stockApi.reducerPath]: stockApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [loanApi.reducerPath]: loanApi.reducer,
  author: authorReducer,
  editorial: editorialReducer,
  category: categoryReducer,
  book: bookReducer,
  stock: stockReducer,
  student: studentReducer
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(bibliotecaApi.middleware)
});

setupListeners(store.dispatch);

// root redux types based on store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
