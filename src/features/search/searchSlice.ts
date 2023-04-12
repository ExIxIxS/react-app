import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchSelector } from 'interfaces';

const searchSlice = createSlice({
  name: 'searcher',
  initialState: {
    value: '',
  },
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      state.value = action.payload;
    },
  },
});

const selectSearch: SearchSelector = (state) => state.searcher.value;
const { change } = searchSlice.actions;

export { change, selectSearch };

export default searchSlice.reducer;
