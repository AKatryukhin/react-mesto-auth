import React from 'react';
import { Route } from 'react-router-dom';
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
        <Route path="/signup">
          <Link className='header__link' to='/signup'>Войти</Link>
        </Route>
        <Route path="/signin">
          <Link className='header__link' to="signup">Регистрация</Link>
        </Route>
        <Route path="/main">
          <Link onClick={signOut}  className='header__link' to='/signin'>Выйти</Link>
        </Route>
          </div>
      </header>
  );
}

export default Header;
