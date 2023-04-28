import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import appStore from '../../appStore/reduxStore';
import RestAuthorCard from './rest-author-card';

describe('RestAuthorCard', () => {
  const id = 'OL146605A';
  const clickHandler = () => {
    return;
  };

  let unmount: () => void;

  beforeEach(() => {
    const renderObj = render(
      <Provider store={appStore}>
        <RestAuthorCard id={id} onCloseClick={clickHandler} />
      </Provider>
    );

    unmount = renderObj.unmount;
  });

  afterEach(() => {
    unmount();
  });

  it('mounts in the document', async () => {
    await waitFor(() => {
      const element = screen.getByTestId('rest-author-card') as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  it('should be rest image path', async () => {
    await waitFor(() => {
      const imgElement = screen.getByTestId('rest-author-card__image') as HTMLImageElement;
      expect(imgElement.src).toContain('http://covers.openlibrary.org/b/id/9234146-M.jpg');
    });
  });
});
