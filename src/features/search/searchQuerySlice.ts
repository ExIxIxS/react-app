import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchQuerySelector } from 'interfaces';

const searchQuerySlice = createSlice({
  name: 'searcher',
  initialState: {
    value: 'J R R Tolkien',
  },
  reducers: {
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

const selectSearchQuery: SearchQuerySelector = (state) => state.searchQuery.value;
const { changeSearchQuery } = searchQuerySlice.actions;

export { changeSearchQuery, selectSearchQuery };

export default searchQuerySlice.reducer;
