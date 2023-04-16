import { CardData } from 'interfaces';
import { getNewCard } from './event-handler-functions';

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
