import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookResponse } from '../interface/types';

interface StockState {
 book?: BookResponse[];
 isDeleteModal: boolean;
}

const initialState = {
 isDeleteModal: false
} as StockState;

const bookSlice = createSlice({
 name: 'stockSlice',
 initialState,
 reducers: {
  setSearchBook(state, action: PayloadAction<BookResponse[]>) {
   state.book = action.payload;
  },
  setDeleteModal(state, action: PayloadAction<boolean>) {
   state.isDeleteModal = action.payload;
  }
 }
});

export const { setDeleteModal, setSearchBook } = bookSlice.actions;
export default bookSlice.reducer;
