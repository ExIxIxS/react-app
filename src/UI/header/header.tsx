import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderProps } from 'interfaces';
import './header.scss';

function Header({ links }: HeaderProps): JSX.Element {
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);

  const handleLinkClick = (index: number) => {
    setActiveLinkIndex(index === activeLinkIndex ? null : index);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__list">
          {links.map((link, index) => (
            <li key={index} className="header__list-item">
              <NavLink
                to={link.to}
                className={index === activeLinkIndex ? 'active header__link' : 'header__link'}
                onClick={() => handleLinkClick(index)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
