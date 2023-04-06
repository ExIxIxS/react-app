import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardWrapper from './card-wrapper';

describe('CardWrapper', () => {
  it('renders correct number of cards', () => {
    const cards = [
      {
        name: 'John',
        surname: 'Doe',
        dateOfBirth: '01/01/2000',
        country: 'USA',
        status: [],
        gender: 'male',
        notifications: true,
        picture: 'https://example.com/profile.jpg',
      },
      {
        name: 'John',
        surname: 'Doe',
        dateOfBirth: '01/01/2000',
        country: 'USA',
        status: [],
        gender: 'male',
        notifications: true,
        picture: 'https://example.com/profile.jpg',
      },
    ];
    render(<CardWrapper cards={cards} />);
    const renderedCards = screen.getAllByTestId('card');
    expect(renderedCards.length).toBe(cards.length);
  });
});
