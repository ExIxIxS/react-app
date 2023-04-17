import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormSubmitResultSelector, SerialFormInputData } from 'interfaces';

const formSubmitSlice = createSlice({
  name: 'forms',
  initialState: {
    value: [] as SerialFormInputData[],
  },
  reducers: {
    changeFormSubmitResult: (state, action: PayloadAction<SerialFormInputData>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

const selectFormSubmitResult: FormSubmitResultSelector = (state) => state.formSubmitResult.value;
const { changeFormSubmitResult } = formSubmitSlice.actions;

export { changeFormSubmitResult, selectFormSubmitResult };

export default formSubmitSlice.reducer;
