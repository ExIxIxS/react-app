import { configureStore } from '@reduxjs/toolkit';
import searchQueryReducer from '../features/search/searchQuerySlice';
import searchResultReducer from '../features/search/searchResultSlice';

const appStore = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
    searchResult: searchResultReducer,
  },
});

export default appStore;
