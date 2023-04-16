import { waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { searchQuerySlice } from './searchQuerySlice';

describe('searchQuerySlice', () => {
  it('should change search query', async () => {
    const testStore = configureStore({
      reducer: {
        searchQuery: searchQuerySlice.reducer,
      },
    });
    testStore.dispatch(searchQuerySlice.actions.changeSearchQuery('new test value'));
    await waitFor(() => testStore.getState().searchQuery.value === 'new test value');
    expect(testStore.getState().searchQuery.value).toEqual('new test value');
  });
});
