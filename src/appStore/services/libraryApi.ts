import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // the React-specific entry point to import createApi
import { getSerializedAuthorCardData } from '../../assets/functions/rest/rest-functions';
import { AuthorCardData, RestAuthor, RestAuthorData, RestSearchData } from 'interfaces';

const baseApiUrl = 'https://openlibrary.org/';

const authorsQueryObj = {
  query: (query: string) => {
    const searchLimit = 12;
    const defaultQuery = 'King';
    const queryStr = query ? query.trim() : defaultQuery;
    const encodedQuery = encodeURI(queryStr);
    return `search/authors.json?q=${encodedQuery}&limit=${searchLimit}`; // search/authors.json?q=Mark%20twain&limit=3
  },
  transformResponse: (responseData: RestSearchData): RestAuthorData[] => {
    return responseData.docs;
  },
};

const authorQueryObj = {
  query: (id: string) => {
    return `/authors/${id}.json`;
  },
  transformResponse: (responseData: RestAuthor): AuthorCardData => {
    return getSerializedAuthorCardData(responseData);
  },
};

// Define a service using a base URL and expected endpoints
export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
  endpoints: (builder) => ({
    getAuthorsByName: builder.query<RestAuthorData[], string>(authorsQueryObj),
    getAuthorById: builder.query<AuthorCardData, string>(authorQueryObj),
  }),
});

export const { useGetAuthorsByNameQuery, useGetAuthorByIdQuery } = libraryApi;

export { authorsQueryObj };
