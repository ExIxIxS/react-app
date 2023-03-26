import { CardData } from '../interfaces';

const cardData: CardData[] = [
  {
    title: 'Card 1',
    description: 'This is card number 1',
    name: 'John',
    surname: 'Doe',
    dateOfBirth: '01/01/1990',
    country: 'USA',
    extras: ['Candles', 'Chocolates'],
    gender: 'male',
    notifications: true,
    picture: 'path/to/picture',
  },
  {
    title: 'Card 2',
    description: 'This is card number 2',
    name: 'Jane',
    surname: 'Doe',
    dateOfBirth: '02/02/1995',
    country: 'Canada',
    extras: ['Flowers', 'Wine'],
    gender: 'female',
    notifications: false,
    picture: 'path/to/picture',
  },
  {
    title: 'Card 3',
    description: 'This is card number 3',
    name: 'Bob',
    surname: 'Smith',
    dateOfBirth: '03/03/2000',
    country: 'UK',
    extras: ['Balloons', 'Cake'],
    gender: 'male',
    notifications: true,
    picture: 'path/to/picture',
  },
];

export default cardData;
