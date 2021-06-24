import React from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation.js';

const Register = ({ handleRegister }) => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid &&
      handleRegister({ email, password }, () => {
        setValues({});
      });
  };

  return (
    <section className='sign'>
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
          maxLength='20'
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
          minLength='8'
          maxLength='20'
          placeholder='Пароль'
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
          title="Пожалуйста, укажите по крайней мере 1 заглавный символ, 1 строчный символ и 1 число."
          value={password || ''}
          onChange={handleChange}
        />
        <span className='sign__input-error'>{errors.password}</span>
        <button
          className='sign__submit'
          type='submit'
          aria-label='Кнопка отправить'
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <Link className='sign__link' to='/signin'>
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
};

export default Register;
