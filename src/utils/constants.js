//кнопка открытия попапа - редактирования профиля
export const popupProfOpenButton = document.querySelector('.profile__edit');
//кнопка открытия попапа - добавления новой карточки
export const popupPlaceOpenButton = document.querySelector('.profile__add');
// селектор секции вставки/отображения карточек
export const cardListSelector = '.galery';
// // форма попапа редактирования профиля
// export const formElementPfof = document.forms.prof_form;
// // поле ввода "имени" в форме попап Prof
// export const nameInput = formElementPfof.elements.name;
// //поле ввода "о себе" в форме попап Prof
// export const jobInput = formElementPfof.elements.about;
// форма попапа добавления карточки
export const formElementPlace = document.forms.place_form;
// форма попапа добавления аватара
export const formElementAvatar = document.forms.avatar_form;

export const popupAvatarOpenButton = document.querySelector('.profile__avatar');

export const ESC_KEYCODE = 'Escape';

export const dataForm = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
