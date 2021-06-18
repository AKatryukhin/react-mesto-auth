import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormAndValidation from '../hooks/useFormAndValidation.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();
  const { values, handleChange, errors,  isValid } = useFormAndValidation();

  const { link } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      onUpdateAvatar(
        {
          avatar: inputRef.current.value,
        },
        () => {
          inputRef.current.value = '';
        }
      );
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='avatar_form'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle='Сохранить'
      isValid={isValid}
    >
      <fieldset className='popup__fild'>
        <input
          ref={inputRef}
          type='url'
          className='popup__input popup__input_type_descr popup__input-avatar'
          id='avatar-link-input'
          name='link'
          value={link || ''}
          placeholder='Ссылка на аватар'
          required
          onChange={handleChange}
        />
        <span className='popup__input-error avatar-link-input-error'>
          {errors.link}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
