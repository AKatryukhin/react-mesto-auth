import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    if (!email || !password){
      return;
    }
    handleLogin({ email, password });
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
