import { waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { searchResultSlice } from './searchResultSlice';
import { RestAuthorData } from 'interfaces';

describe('searchQuerySlice', () => {
  const authorData: RestAuthorData[] = [
    {
      key: '1234',
      text: ['This is some text about the author.'],
      type: 'author',
      name: 'Jane Doe',
      alternate_names: ['Jane Smith'],
      birth_date: '1990-01-01',
      top_work: 'Some Book',
      work_count: 5,
      top_subjects: ['Fiction', 'History'],
      _version_: 1,
    },
  ];

  it('should change search result', async () => {
    const testStore = configureStore({
      reducer: {
        searchResult: searchResultSlice.reducer,
      },
    });
    testStore.dispatch(searchResultSlice.actions.changeSearchResult(authorData));
    await waitFor(() => testStore.getState().searchResult.value.length);
    expect(testStore.getState().searchResult.value).toEqual(authorData);
  });
});
