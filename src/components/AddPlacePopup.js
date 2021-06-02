import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/FormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange,  errors, isValid, setValues } =
    useFormAndValidation();

  const { name, link } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      onAddPlace({ name, link }, () => {
        setValues('');
      });
  }

  // const [name, setName] = React.useState('');
  // const [link, setLink] = React.useState('');

  // function handleChangeName(evt) {
  //   setName(evt.target.value);
  // }

  // function handleChangeLink(evt) {
  //   setLink(evt.target.value);
  // }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='place_form'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle='Создать'
    >
      <fieldset className='popup__fild'>
        <input
          type='text'
          className='popup__input popup__input_type_name'
          id='place-input'
          name='name'
          placeholder='Название'
          required
          minLength='2'
          maxLength='30'
          onChange={handleChange}
          value={name || ''}
        />
        <span className='popup__input-error place-input-error'>{errors.name}</span>
        <input
          type='url'
          className='popup__input popup__input_type_descr'
          id='link-input'
          name='link'
          placeholder='Ссылка на картинку'
          required
          onChange={handleChange}
          value={link}
        />
        <span className='popup__input-error link-input-error'>{errors.link}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
