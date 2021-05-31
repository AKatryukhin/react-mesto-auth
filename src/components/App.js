import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { ESC_KEYCODE } from '../utils/constants';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { AppContext } from '../contexts/AppContext';
import * as auth from '../utils/auth';

function App() {
  // переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // переменная состояния, отвечающая за данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запросы в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCardSomeLike) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCardSomeLike : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    // Отправляю запрос в API и получаю массив, исключив из него удалённую карточку
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getProfileInfo()
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // переменная состояния, значением которой задается ссылка на карточку
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    //функция закрытия попапов по Escape
    function handleEscClose(evt) {
      evt.key === ESC_KEYCODE && closeAllPopups();
    }

    //функция закрытия попапов по оверлей
    function handleOverlayClose(evt) {
      evt.target.classList.contains('popup_opened') && closeAllPopups();
    }

    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('click', handleOverlayClose);

    return () => {
      window.removeEventListener('click', handleOverlayClose);
      window.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  //  обработчики для стейтовых переменных
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // функция закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setProfileInfo({ name, about })
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }, onSuccess) {
    api
      .setUserAvatar({ avatar })
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
        onSuccess();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }, onSuccess) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        onSuccess();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [isRegist, setIsRegist] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleRegister = ({ email, password }) => {
    auth
      .register({ email, password })
      .then((data) => {
        setUserData({ email: data.data.email });
        setIsRegist(true);
        handleInfoTooltipClick();
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsRegist(false);
        handleInfoTooltipClick();
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize({ email, password })
      .then(({token}) => {
        if ({token}) {
          localStorage.setItem('jwt', token);
        }
        checkToken();
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipClick();
      });
  };

  useEffect(() => {
    checkToken();
  },[]);


  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/main'); 
          }
        }
      );
    }
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    history.push('/login');
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          userData: userData,
          loggedIn: loggedIn,
          isRegist: isRegist,
          handleLogin: handleLogin,
        }}
      >
        <div className='background'>
          <div className='page'>
            <Header 
            signOut={signOut}
            />
            <Switch>
              <ProtectedRoute
                path='/main'
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Route path='/signin'>
                <Login handleLogin={handleLogin} />
              </Route>
              <Route path='/signup'>
                <Register handleRegister={handleRegister} />
              </Route>
              <Route exact path='/'>
                {loggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}
              </Route>
            </Switch>
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <PopupWithForm
              name='confirm_form'
              title='Вы уверены?'
              onClose={closeAllPopups}
              buttonTitle='Да'
            ></PopupWithForm>
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              isRegist={false}
            ></InfoTooltip>
            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          </div>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
