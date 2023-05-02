import { render } from '@testing-library/react';
import FormPage from './form-page';
import { Provider } from 'react-redux';
import appStore from '../appStore/reduxStore';
import { BrowserRouter } from 'react-router-dom';

describe('FormPage', () => {
  test('renders form and card wrapper', () => {
    const { container } = render(
      <Provider store={appStore}>
        <BrowserRouter>
          <FormPage />
        </BrowserRouter>
      </Provider>
    );
    const form = container.querySelector('.form');
    const cardWrapper = container.querySelector('.card-wrapper');
    expect(form).toBeInTheDocument();
    expect(cardWrapper).toBeInTheDocument();
  });
});
