import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchQuerySelector } from 'interfaces';

const searchQuerySlice = createSlice({
  name: 'searcher',
  initialState: {
    value: 'initial',
  },
  reducers: {
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      console.log(state.value);
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

const selectSearchQuery: SearchQuerySelector = (state) => state.searchQuery.value;
const { changeSearchQuery } = searchQuerySlice.actions;

export { changeSearchQuery, selectSearchQuery };

export default searchQuerySlice.reducer;
