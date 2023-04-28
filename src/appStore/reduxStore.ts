import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import searchQueryReducer from './features/search/searchQuerySlice';
import searchResultReducer from './features/search/searchResultSlice';
import formSubmitReducer from './features/forms/formSubmitSlice';
import { libraryApi } from './services/libraryApi';

const appReducer = combineReducers({
  [libraryApi.reducerPath]: libraryApi.reducer,
  searchQuery: searchQueryReducer,
  searchResult: searchResultReducer,
  formSubmitResult: formSubmitReducer,
});

export type RootState = ReturnType<typeof appReducer>;

function createAppStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(libraryApi.middleware),
    preloadedState,
  });
}

const appStore = createAppStore();

export { appReducer, appStore, createAppStore };

export default appStore;
