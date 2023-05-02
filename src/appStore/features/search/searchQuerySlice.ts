import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchQuerySelector } from 'interfaces';

const searchQuerySlice = createSlice({
  name: 'searcher',
  initialState: {
    value: '',
  },
  reducers: {
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

const selectSearchQuery: SearchQuerySelector = (state) => state.searchQuery.value;
const { changeSearchQuery } = searchQuerySlice.actions;

export { searchQuerySlice, changeSearchQuery, selectSearchQuery };

export default searchQuerySlice.reducer;
