import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import searchQueryReducer from '../features/search/searchQuerySlice';
import searchResultReducer from '../features/search/searchResultSlice';
import formSubmitReducer from '../features/forms/formSubmitSlice';
import { libraryApi } from '../services/openlibraryApi';

const appStore = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    searchQuery: searchQueryReducer,
    searchResult: searchResultReducer,
    formSubmitResult: formSubmitReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(libraryApi.middleware),
});

setupListeners(appStore.dispatch);

export default appStore;
