import React from 'react';
import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Header({ signOut }) {
  const value = React.useContext(AppContext);
  return (
      <header className='header page__header'>
        <img className='header__logo' src={logo} alt='Логотип Место' />
        <div className='header__link-container'>
        {value.loggedIn && <span className='header__user-mail'>{value.userData.email}</span>}
        {!value.loggedIn &&
          <Link className='header__link' to='/signup'>{value.isRegist? 'Войти' : 'Регистрация'}</Link>
        }
        {value.loggedIn &&
          <Link onClick={signOut}  className='header__link' to='/signin'>{!value.isRegist ? 'Выйти' : 'Войти'}</Link>
        }
          </div>
      </header>
  );
}

export default Header;
