import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
 
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link },
      () => {
        setName('');
        setLink('');
      });
  }

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

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
          onChange={handleChangeName}
          value={name}
        />
        <span className='popup__input-error place-input-error'></span>
        <input
          type='url'
          className='popup__input popup__input_type_descr'
          id='link-input'
          name='link'
          placeholder='Ссылка на картинку'
          required
          onChange={handleChangeLink}
          value={link}
        />
        <span className='popup__input-error link-input-error'></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
