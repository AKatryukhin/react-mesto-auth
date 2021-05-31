import React, { useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import * as auth from '../utils/auth';

function Login({ handleLogin }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  // const value = React.useContext(AppContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.email || !formValues.password){
      return;
    }
    auth.authorize(formValues.email, formValues.password)
    .then((data) => {
      if (data.jwt){
        setFormValues({email: '', password: ''} ,() => {
       handleLogin(data.user.ru_cal_goal.calGoal);
      //  history.push('/main');
        })
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='sign'>
      <h2 className='sign__title'>Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
