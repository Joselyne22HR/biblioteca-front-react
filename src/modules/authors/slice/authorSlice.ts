import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../interface/author.interface';

interface AuthorState {
  author?: Author[];
}

const initialState = {
  author: []
} as AuthorState;

const authorSlice = createSlice({
  name: 'authorSlice',
  initialState,
  reducers: {
    setAuthors(state, action: PayloadAction<Author[]>) {
      state.author = action.payload;
    }
  }
});

export const { setAuthors } = authorSlice.actions;
export default authorSlice.reducer;
