import React from 'react';
import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Header() {
  const value = React.useContext(AppContext);
 
  return (
      <header className='header page__header'>
        <img className='header__logo' src={logo} alt='Логотип Место' />
        <div><Link className='header__link' to='/login'>{!value.loggedIn ? 'Войти' : 'Регистрация'}</Link></div>
      </header>
  );
}

export default Header;
