import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RestAuthorData, SearchResultSelector } from 'interfaces';

const searchResultSlice = createSlice({
  name: 'searcher',
  initialState: {
    value: [] as RestAuthorData[],
  },
  reducers: {
    changeSearchResult: (state, action: PayloadAction<RestAuthorData[]>) => {
      state.value = action.payload;
    },
  },
});

const selectSearchResult: SearchResultSelector = (state) => state.searchResult.value;
const { changeSearchResult } = searchResultSlice.actions;

export { changeSearchResult, selectSearchResult };

export default searchResultSlice.reducer;
