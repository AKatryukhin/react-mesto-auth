import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/FormAndValidation';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) 


{
  const inputRef = React.useRef();
  const { values, handleChange, errors, isValid, setValues } =
useFormAndValidation();

const { avatar } = values;

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
    >
      <fieldset className='popup__fild'>
        <input
          ref={inputRef}
          type='url'
          className='popup__input popup__input_type_descr popup__input-avatar'
          id='avatar-link-input'
          name='link'
          placeholder='Ссылка на аватар'
          required
        />
        <span className='popup__input-error avatar-link-input-error'></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
