import { Route, Routes } from 'react-router-dom';
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

function AppRoutes() {
  return (
    <>
      <Header links={headerLinks} />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/form" element={<FormPage />}></Route>
          <Route path="/about" element={<AboutUsPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </>
  );
}

export { AppRoutes };
