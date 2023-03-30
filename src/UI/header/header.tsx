import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__list-item">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending header__link'
                    : isActive
                    ? 'active header__link'
                    : 'header__link'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink
                to="/form"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending header__link'
                    : isActive
                    ? 'active header__link'
                    : 'header__link'
                }
              >
                Form
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink
                to="/about"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending header__link'
                    : isActive
                    ? 'active header__link'
                    : 'header__link'
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
