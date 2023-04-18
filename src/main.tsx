import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './app/reduxStore';
import MainPage from './pages/main-page';
import AboutUsPage from './pages/about-us-page';
import NotFoundPage from './pages/not-found-page';
import Header from './UI/header/header';
import FormPage from './pages/form-page';

import { Link } from 'interfaces';

import './index.css';

const headerLinks: Link[] = [
  { to: '/', label: 'Home' },
  { to: '/form', label: 'Form' },
  { to: '/about', label: 'About Us' },
];

const router = createBrowserRouter([
  {
    element: (
      <>
        <Header links={headerLinks} />
        <main>
          <Outlet />
        </main>
      </>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'form',
        element: <FormPage />,
      },
      {
        path: 'about',
        element: <AboutUsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
