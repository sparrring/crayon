import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegisterState {
  name: string;
}

const initialState: RegisterState = {
  name: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setName } = registerSlice.actions;

export default registerSlice.reducer;
