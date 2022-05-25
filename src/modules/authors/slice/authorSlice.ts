import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../interface/author.interface';

interface AuthorState {
 author?: Author[];
 isDeleteModal: boolean;
}

const initialState = {
 author: [],
 isDeleteModal: false
} as AuthorState;

const authorSlice = createSlice({
 name: 'authorSlice',
 initialState,
 reducers: {
  setAuthors(state, action: PayloadAction<Author[]>) {
   state.author = action.payload;
  },
  setDeleteModal(state, action: PayloadAction<boolean>) {
   state.isDeleteModal = action.payload;
  }
 }
});

export const { setAuthors, setDeleteModal } = authorSlice.actions;
export default authorSlice.reducer;
