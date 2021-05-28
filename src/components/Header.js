import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  let loggedIn;
  return (
      <header className='header page__header'>
        <img className='header__logo' src={logo} alt='Логотип Место' />
        <div><Link className='header__link' to='/login'>{loggedIn ? 'Войти' : 'Регистрация'}</Link></div>
      </header>
  );
}

export default Header;
