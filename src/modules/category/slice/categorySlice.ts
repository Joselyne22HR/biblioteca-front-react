import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../interface/category.interface';

interface CategoryState {
 category?: Category[];
 isDeleteModal: boolean;
}

const initialState = {
 category: [],
 isDeleteModal: false
} as CategoryState;

const categorySlice = createSlice({
 name: 'categorySlice',
 initialState,
 reducers: {
  setCategory(state, action: PayloadAction<Category[]>) {
   state.category = action.payload;
  },
  setDeleteModal(state, action: PayloadAction<boolean>) {
   state.isDeleteModal = action.payload;
  }
 }
});

export const { setDeleteModal, setCategory } = categorySlice.actions;
export default categorySlice.reducer;
