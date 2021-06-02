import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState, useCallback, useEffect,  } from 'react';
import { useFormAndValidation } from '../hooks/FormAndValidation';

// const validators = {
//   name: {
//     required: (value) => {
//       return value === '';
//     },
//     minLength: (value) => {
//       return value.length < 2;
//     },
//     maxLength: (value) => {
//       return value.length > 40;
//     },
//   },
//   description: {
//     required: (value) => {
//       return value === '';
//     },
//     minLength: (value) => {
//       return value.length < 2;
//     },
//     containNumbers: (value) => {
//       return !/[0-9]/.test(value);
//     },
//   },
// };

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setIsValid, setValues } = useFormAndValidation();

  // const [values, setValues] = useState({
  //   name: '',
  //   description: '',
  // });

  // const handleInputChange = useCallback(
  //   (e) => {
  //     const { name, value } = e.target;
  //     /*jshint -W119*/
  //     setFormValues((prevState) => ({ ...prevState, [name]: value }));
  //     /*jshint +W119*/
  //   },
  //   [setFormValues]
  // );

  const { name, description } = values;

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || '',
        description: currentUser.about || '',
      });
    }
  }, [currentUser, isOpen]);

  // const [errors, setErrors] = useState({
  //   name: {
  //     required: true,
  //     minLength: true,
  //     maxLength: true,
  //   },
  //   description: {
  //     required: true,
  //     minLength: true,
  //     containNumbers: true,
  //   },
  // });

  // useEffect(() => {
  //   const { name, description } = values;

  //   const nameValidationResult = Object.keys(err)
  //     .map((errorKey) => {
  //       const errorResult = validators.name[errorKey](name);

  //       return { [errorKey]: errorResult };
  //     })
  //     .reduce((acc, el) => ({ ...acc, ...el }), {});

  //   const descriptionValidationResult = Object.keys(validators.description)
  //     .map((errorKey) => {
  //       const errorResult = validators.description[errorKey](description);

  //       return { [errorKey]: errorResult };
  //     })
  //     .reduce((acc, el) => ({ ...acc, ...el }), {});

  //   setErrors({
  //     name: nameValidationResult,
  //     description: descriptionValidationResult,
  //   });
  // }, [formValues, setErrors]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='prof_form'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle='Сохранить'
    >
      <fieldset className='popup__fild'>
        <input
          type='text'
          className='popup__input popup__input_type_name'
          id='name-input'
          name='name'
          required
          minLength='2'
          maxLength='40'
          placeholder='имя'
          value={name}
          onChange={handleChange}
        />
        <span className='popup__input-error name-input-error'>
          {errors.name}
        </span>
        <input
          type='text'
          className='popup__input popup__input_type_descr'
          id='about-input'
          name='description'
          required
          minLength='2'
          maxLength='200'
          placeholder='описание'
          value={description}
          onChange={handleChange}
        />
        <span className='popup__input-error name-input-error'>
        {errors.name}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
