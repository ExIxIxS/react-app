import { waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { formSubmitSlice } from './formSubmitSlice';
import { SerialFormInputData } from 'interfaces';

describe('formSubmitSlice', () => {
  const formSubmitData: SerialFormInputData = {
    name: 'John',
    surName: 'Doe',
    dateOfBirth: '1990-01-01',
    country: 'USA',
    status: ['Married', 'Employed'],
    gender: 'Male',
    notifications: true,
    picture: 'picture.png',
  };

  it('should change search result', async () => {
    const testStore = configureStore({
      reducer: {
        formSubmitResult: formSubmitSlice.reducer,
      },
    });
    testStore.dispatch(formSubmitSlice.actions.changeFormSubmitResult(formSubmitData));
    await waitFor(() => testStore.getState().formSubmitResult.value.length);
    expect(testStore.getState().formSubmitResult.value).toEqual([formSubmitData]);
  });
});
