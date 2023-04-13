import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // the React-specific entry point to import createApi
import { RestAuthorData } from 'interfaces';

// Define a service using a base URL and expected endpoints
export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org/' }),
  endpoints: (builder) => ({
    getAuthorByName: builder.query<RestAuthorData, string>({
      query: (query) => `search/authors.json?q=${encodeURI(query)}&limit=5`, // ?q=twain&limit=3
    }),
  }),
});

const { useGetAuthorByNameQuery } = libraryApi;

export { useGetAuthorByNameQuery };
