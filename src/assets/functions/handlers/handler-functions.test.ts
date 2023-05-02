import { CardData } from 'interfaces';
import { getNewCard } from './event-handler-functions';
import { getRTKFetchErrorMessage } from './error-handler-functions';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

describe('getRTKFetchErrorMessage', () => {
  it('should return Fetch error message for FetchBaseQueryError', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: 'Not Found',
    };
    const errorMessage = getRTKFetchErrorMessage(error);
    expect(errorMessage).toBe('Fetch error: 404 Not Found');
  });

  it('should return Serialized error message for SerializedError', () => {
    const error = {
      name: 'Error',
      message: 'Some error occurred',
    };
    const errorMessage = getRTKFetchErrorMessage(error);
    expect(errorMessage).toBe('Serialized error: Error Some error occurred');
  });

  it('should return Unknown RTKFetchError Error for undefined error', () => {
    const errorMessage = getRTKFetchErrorMessage(undefined);
    expect(errorMessage).toBe('Unknown RTKFetchError Error');
  });

  it('should return Unknown RTKFetchError Error for invalid error object', () => {
    const errorMessage = getRTKFetchErrorMessage(undefined);
    expect(errorMessage).toBe('Unknown RTKFetchError Error');
  });
});

describe('getNewCard', () => {
  it('returns a new card object with default values when no card object is provided', () => {
    const expectedCard: CardData = {
      name: 'User name',
      dateOfBirth: '-',
      country: '-',
      status: ['-'],
      gender: 'male',
      notifications: true,
      picture: '../src/assets/img/react.png',
    };
    expect(getNewCard()).toEqual(expectedCard);
  });

  it('returns a new card object with updated values when a card object is provided', () => {
    const cardObj: CardData = {
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      country: 'USA',
      status: ['Active', 'Premium'],
      gender: 'male',
      notifications: false,
      picture: '../src/assets/img/vue.png',
    };
    const expectedCard: CardData = {
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      country: 'USA',
      status: ['Active', 'Premium'],
      gender: 'male',
      notifications: false,
      picture: '../src/assets/img/vue.png',
    };
    expect(getNewCard(cardObj)).toEqual(expectedCard);
  });
});
