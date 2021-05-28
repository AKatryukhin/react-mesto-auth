import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function Login({handleLogin}) {

  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

  // const handleChange(e) => {
  //   const { name, value } = e.target;
  //   setState({
  //     [name]: value
  //   });
  // }

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
<PopupWithForm
      // onSubmit={handleSubmit}
      // name='prof_form'
      // title='Редактировать профиль'
      // isOpen={isOpen}
      // onClose={onClose}
      // buttonTitle='Сохранить'
    >
    </PopupWithForm>
  );
}

export default Login;