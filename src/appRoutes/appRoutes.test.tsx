import { render, screen } from '@testing-library/react';
import { AppRoutes } from './appRoutes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from '../appStore/reduxStore';

describe('AppRoutes', () => {
  test('renders home link', async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  test('renders about link', async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
    const aboutLink = screen.getByRole('link', { name: /about us/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.getAttribute('href')).toBe('/about');
  });

  test('renders form link', async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
    const formLink = screen.getByRole('link', { name: /form/i });
    expect(formLink).toBeInTheDocument();
    expect(formLink.getAttribute('href')).toBe('/form');
  });
});
