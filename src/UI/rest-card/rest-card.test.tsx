import { fireEvent, render, screen } from '@testing-library/react';
import RestCard from './rest-card';

import { RestCardProps } from 'interfaces';
import { act } from 'react-dom/test-utils';

describe('RestCard', () => {
  const props: RestCardProps = {
    id: 'OL146605A',
    name: 'Edgar',
    birthDate: 'string',
    topWork: 'top work name',
    workCount: 2323,
  };

  const { container, unmount } = render(<RestCard {...props} />);

  beforeEach(() => {
    render(<RestCard {...props} />);
  });

  afterEach(() => {
    unmount();
  });

  it('mounts in the document', () => {
    expect(container).toBeInTheDocument();
  });

  it('should render RestAuthorCard when showModal is true', async () => {
    const restCard = screen.getByTestId('rest-card');
    await act(() => fireEvent.click(restCard));

    const restAuthorCard = screen.getByTestId('rest-author-card');
    expect(restAuthorCard).toBeInTheDocument();
  });
});
