import { render, screen } from '@testing-library/react';
import Card from './card';
import { CardProps } from 'interfaces';

describe('Card', () => {
  const props: CardProps = {
    name: 'John Smith',
    dateOfBirth: '01-01-2000',
    country: 'USA',
    status: ['parent'],
    gender: 'male',
    notifications: false,
    picture: '',
  };

  const { container, unmount } = render(<Card {...props} />);

  beforeEach(() => {
    render(<Card {...props} />);
  });

  afterEach(() => {
    unmount();
  });

  it('mounts in the document', () => {
    expect(container).toBeInTheDocument();
  });

  it('includes img url', () => {
    const imgElement = screen.getByAltText(`${props.name} profile picture`) as HTMLImageElement;
    expect(imgElement?.src).toEqual('http://localhost:3000/src/assets/img/react.png');
  });

  it('displays the correct notifications status', () => {
    const notificationsElement = screen.getByTestId('notifications-element');
    const expectedText = `Notifications: ${props.notifications ? 'Enabled' : 'Disabled'}`;
    expect(notificationsElement).toHaveTextContent(expectedText);
  });
});
