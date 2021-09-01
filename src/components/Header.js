import React from 'react';
import { Route } from 'react-router-dom';
import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header({ onSignOut }) {
  const value = React.useContext(AppContext);
  const user = React.useContext(CurrentUserContext);

  return (
    <header className='header page__header'>
      <img className='header__logo' src={logo} alt='Логотип Место' />
      <input className='menu-burger__toggle' type='checkbox' id='toggle' />
      <label className='menu-burger' htmlFor='toggle'>
        <span></span>
      </label>
      <div className='header__link-container'>
        {value.loggedIn && (
          <span className='header__user-mail'>{user.email}</span>
        )}
        <Route path='/signup'>
          <Link className='header__link' to='/signin'>
            Войти
          </Link>
        </Route>
        <Route path='/signin'>
          <Link className='header__link' to='/signup'>
            Регистрация
          </Link>
        </Route>
        <Route exact path='/'>
          <Link onClick={onSignOut} className='header__link' to='/signin'>
            Выйти
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
