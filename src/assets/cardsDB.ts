import { CardData } from '../interfaces';

const cardData: CardData[] = [
  {
    name: 'John',
    dateOfBirth: '01/01/1990',
    country: 'USA',
    status: ['parent'],
    gender: 'male',
    notifications: true,
    picture: '',
  },
  {
    name: 'Jane',
    dateOfBirth: '02/02/1995',
    country: 'Canada',
    status: ['married', 'parent'],
    gender: 'female',
    notifications: false,
    picture: '',
  },
  {
    name: 'Bob',
    dateOfBirth: '03/03/2000',
    country: 'UK',
    status: [],
    gender: 'male',
    notifications: true,
    picture: '',
  },
];

export default cardData;
