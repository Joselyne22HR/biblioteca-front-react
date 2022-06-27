import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentState {
 isDeleteModal: boolean;
}

const initialState = {
 isDeleteModal: false
} as StudentState;

const studentSlice = createSlice({
 name: 'stockSlice',
 initialState,
 reducers: {
  setDeleteModal(state, action: PayloadAction<boolean>) {
   state.isDeleteModal = action.payload;
  }
 }
});

export const { setDeleteModal } = studentSlice.actions;
export default studentSlice.reducer;
