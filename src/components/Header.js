import React from 'react';
import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Header() {
  const value = React.useContext(AppContext);
  return (
      <header className='header page__header'>
        <img className='header__logo' src={logo} alt='Логотип Место' />
        <div className='header__link-container'>
        {value.loggedIn && <span className='header__user-mail'>{value.userData.email}</span>}
          <Link className='header__link' to='/login'>{!value.loggedIn ? 'Войти' : 'Регистрация'}</Link>
        </div>
      </header>
  );
}

export default Header;
