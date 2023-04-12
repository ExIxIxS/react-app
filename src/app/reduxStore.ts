import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';

const appStore = configureStore({
  reducer: {
    searcher: searchReducer,
  },
});

export default appStore;
