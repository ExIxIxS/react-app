import { act, render, screen } from '@testing-library/react';
import Header from './header';
import { Provider } from 'react-redux';
import appStore from '../../appStore/reduxStore';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('should update active link index when a link is clicked', async () => {
    const links = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Us' },
    ];

    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Header links={links} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Home')?.className).toContain('active');
    expect(screen.queryByText('About Us')?.className).not.toContain('active');

    const aboutUsLink = screen.getByText('About Us');
    await act(async () => {
      aboutUsLink.click();
    });

    expect(screen.queryByText('Home')?.className).not.toContain('active');
    expect(aboutUsLink.className).toContain('active');
  });
});
