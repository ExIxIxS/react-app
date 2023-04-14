import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // the React-specific entry point to import createApi
import { RestAuthorData, RestSearchData } from 'interfaces';

// Define a service using a base URL and expected endpoints
export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org/' }),
  endpoints: (builder) => ({
    getAuthorsByName: builder.query<RestAuthorData[], string>({
      query: (query) => {
        const searchLimit = 5;
        const encodedQuery = encodeURI(query.trim());
        return `search/authors.json?q=${encodedQuery}&limit=${searchLimit}`;
      }, // search/authors.json?q=Mark%20twain&limit=3
      transformResponse: (responseData: RestSearchData): RestAuthorData[] => {
        return responseData.docs;
      },
    }),
  }),
});

const { useGetAuthorsByNameQuery } = libraryApi;

export { useGetAuthorsByNameQuery };
