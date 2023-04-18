import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RestCard from './rest-card';

import { RestCardProps } from 'interfaces';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import appStore from '../../app/reduxStore';

describe('RestCard', () => {
  const props: RestCardProps = {
    id: 'OL146605A',
    name: 'Edgar',
    birthDate: 'string',
    topWork: 'top work name',
    workCount: 2323,
  };

  let unmount: () => void;

  beforeEach(() => {
    const renderObj = render(
      <Provider store={appStore}>
        <RestCard {...props} />
      </Provider>
    );

    unmount = renderObj.unmount;
  });

  afterEach(() => {
    unmount();
  });

  it('mounts in the document', () => {
    const restCard = screen.getByTestId('rest-card');
    expect(restCard).toBeInTheDocument();
  });

  it('should render RestAuthorCard when showModal is true', async () => {
    act(() => {
      const restCard = screen.getByTestId('rest-card');
      fireEvent.click(restCard);
    });

    waitFor(() => {
      const restAuthorCard = screen.getByTestId('rest-author-card');
      expect(restAuthorCard).toBeInTheDocument();
    });
  });
});
