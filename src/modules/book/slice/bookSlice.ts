import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../interface/book.inteface';

interface BookState {
 book?: Book[];
 isDeleteModal: boolean;
}

const initialState = {
 book: [],
 isDeleteModal: false
} as BookState;

const bookSlice = createSlice({
 name: 'bookSlice',
 initialState,
 reducers: {
  setBook(state, action: PayloadAction<Book[]>) {
   state.book = action.payload;
  },
  setDeleteModal(state, action: PayloadAction<boolean>) {
   state.isDeleteModal = action.payload;
  }
 }
});

export const { setDeleteModal, setBook } = bookSlice.actions;
export default bookSlice.reducer;