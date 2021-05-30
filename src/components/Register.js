import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AppContext } from '../contexts/AppContext';

function Register({ handleSubmit }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    message: ''
  });

  const value = React.useContext(AppContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      [name]: value
    });
  }

  // const handleSubmit(e) => {
  //   e.preventDefault();
  //   if (!username || !password){
  //     return;
  //   }
  //   auth.authorize(this.state.username, this.state.password)
  //   .then((data) => {
  //     if (data.jwt){
  //       this.setState({email: '', password: ''} ,() => {
  //       this.props.handleLogin(data.user.ru_cal_goal.calGoal);
  //       this.props.history.push('/diary');
  //       })
  //     }
  //   })
  //   .catch(err => console.log(err));
  // }
  return (
    <div className='sign'>
      <h2 className='sign__title'>Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className='sign__form'
        name='sign_form'
        noValidate
      >
        <input
          type='email'
          className='sign__input'
          id='email'
          name='email'
          required
          minLength='2'
          maxLength='40'
          placeholder='Email'
          value={formValues.email}
          onChange={handleChange}
        />
        <input
          type='password'
          className='sign__input'
          id='password'
          name='password'
          required
          minLength='2'
          maxLength='200'
          placeholder='Пароль'
          value={formValues.password}
          onChange={handleChange}
        />
        <button
          className='sign__submit'
          type='submit'
          aria-label='Кнопка отправить'
        >
          Зарегистрироваться
        </button>
      </form>
      <Link className='sign__link' to='/login'>
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
