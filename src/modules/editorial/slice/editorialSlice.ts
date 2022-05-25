import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Editorial } from '../interface/editorial.interface';

interface EditorialState {
 editorial?: Editorial[];
 isDeleteModal: boolean;
}

const initialState = {
 editorial: [],
 isDeleteModal: false
} as EditorialState;

const editorialSlice = createSlice({
 name: 'editorialSlice',
 initialState,
 reducers: {
  setEditorial(state, action: PayloadAction<Editorial[]>) {
   state.editorial = action.payload;
  },
  setDeleteModal(state, action: PayloadAction<boolean>) {
   state.isDeleteModal = action.payload;
  }
 }
});

export const { setDeleteModal, setEditorial } = editorialSlice.actions;
export default editorialSlice.reducer;