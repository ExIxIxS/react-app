import { configureStore } from '@reduxjs/toolkit';
import searchQueryReducer from '../features/search/searchQuerySlice';
import searchResultReducer from '../features/search/searchResultSlice';
import formSubmitReducer from '../features/forms/formSubmitSlice';

const appStore = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
    searchResult: searchResultReducer,
    formSubmitResult: formSubmitReducer,
  },
});

export default appStore;
