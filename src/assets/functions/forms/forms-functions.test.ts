import { CardData, FormInputData, SerialFormInputData } from 'interfaces';
import { getCardData, getSerialFormInputData } from './forms-functions';

describe('getSerialFormInputData function', () => {
  const data: FormInputData = {
    name: 'John',
    surName: 'Doe',
    dateOfBirth: '1990-01-01',
    country: 'usa',
    status: [],
    gender: 'male',
    notifications: true,
    picture: undefined,
  };

  const expectedResult: SerialFormInputData = {
    name: 'John',
    surName: 'Doe',
    dateOfBirth: '1990-01-01',
    country: 'usa',
    status: [],
    gender: 'male',
    notifications: true,
    picture: '',
  };

  it('should return the correct CardData object', () => {
    const result = getSerialFormInputData(data);

    expect(result).toEqual(expectedResult);
  });
});

describe('getCardData function', () => {
  const submitData: SerialFormInputData = {
    name: 'John',
    surName: 'Doe',
    dateOfBirth: '1990-01-01',
    country: 'usa',
    status: [],
    gender: 'male',
    notifications: true,
    picture: '',
  };

  const expectedResult: CardData = {
    name: 'John Doe',
    dateOfBirth: '1990-01-01',
    country: 'usa',
    status: [],
    gender: 'male',
    notifications: true,
    picture: '',
  };

  it('should return the correct CardData object', () => {
    const result = getCardData(submitData);

    expect(result).toEqual(expectedResult);
  });
});
