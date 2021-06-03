import React from 'react';
import { useFormAndValidation } from '../hooks/FormAndValidation';

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { email, password } = formValues;
    if (!email || !password) {
      return;
    }
    isValid &&
      handleLogin({ email, password }, () => {
        setValues({});
      });
  };

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
          value={email || ''}
          onChange={handleChange}
        />
        <span className='sign__input-error'>{errors.email}</span>
        <input
          type='password'
          className='sign__input'
          id='password'
          name='password'
          required
          minLength='2'
          maxLength='200'
          placeholder='Пароль'
          value={password || ''}
          onChange={handleChange}
        />
        <span className='sign__input-error'>{errors.password}</span>
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
