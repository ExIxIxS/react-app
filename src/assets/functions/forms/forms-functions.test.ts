import { getCardData } from './forms-functions';

describe('getCardData function', () => {
  it('should return the correct CardData object', () => {
    const submitData = {
      name: 'John',
      surName: 'Doe',
      dateOfBirth: '1990-01-01',
      country: 'usa',
      status: [],
      gender: 'male',
      notifications: true,
      picture: undefined,
    };

    const expectedResult = {
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      country: 'usa',
      status: [],
      gender: 'male',
      notifications: true,
      picture: '',
    };

    const result = getCardData(submitData);

    expect(result).toEqual(expectedResult);
  });
});
