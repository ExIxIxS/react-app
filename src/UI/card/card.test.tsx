import { render, screen } from '@testing-library/react';
import Card from './card';
import { CardProps } from 'interfaces';

describe('Card', () => {
  const props: CardProps = {
    name: 'John',
    surname: 'Doe',
    dateOfBirth: '01/01/2000',
    country: 'USA',
    status: ['Active'],
    gender: 'male',
    notifications: true,
    picture: 'https://example.com/profile.jpg',
  };

  it('renders the name correctly', () => {
    render(<Card {...props} />);
    const nameElement = screen.getByText(props.name);
    expect(nameElement).toBeInTheDocument();
  });
});
