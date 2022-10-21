import React from "react";
import loader from '../images/loader.gif';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup'
import ImagePreviewPopup from "./ImagePreviewPopup";
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { useState, useEffect } from 'react';
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { api } from '../utils/api.js';
import { authApi } from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoggedContext } from '../contexts/LoggedContext';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState({ avatar: loader });
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isDeleteConfirmPopupOpened, setIsDeleteConfirmPopupOpened] = useState(false);
  const [isPreviewCardPopupOpened, setPreviewCardPopupOpened] = useState(false);
  const [isInfoTooltipOpened, setInfoTooltipOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedinEmail, setLoggedinEmail] = useState("");

  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);

  const [editProfilePopupButtonText, setEditProfilePopupButtonText] = useState("Сохранить");
  const [editAvatarPopupButtonText, setEditAvatarPopupButtonText] = useState("Сохранить");
  const [addPlacePopupButtonText, setAddPlacePopupButtonText] = useState("Создать");
  const [confirmDeleteButtonPopupText, setConfirmDeleteButtonPopupText] = useState("Да");

  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    authApi.checkToken(token)
      .then((data) => {
        const resEmail = data?.data?.email;
        if (resEmail) {
          setLoggedinEmail(resEmail);
          history.push('/');
        }
      }).catch(err => {
        console.log(`Ошибка проверки токена: ${err}`);
      });
  });

  useEffect(() => {
    if (!loggedinEmail) {
      return;
    }
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()])
      .then(([profileInfo, initialCards]) => {
        setCurrentUser(profileInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки начальных данных: ${err}`);
      });
  }, [loggedinEmail]);

  function handleCardClick(card) {
    setSelectedCard(card);
    setPreviewCardPopupOpened(true);
  };

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteConfirmPopupOpened(true);
  }

  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const action = isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id);
    action
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Ошибка лайка карточки: ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  };

  function handleUpdateUser(newUserInfo) {
    const origButtonText = editProfilePopupButtonText;
    setEditProfilePopupButtonText("Сохранение...");
    api.updateUserInfo(JSON.stringify(newUserInfo))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка обновления информации о пользователе: ${err}`);
      }).finally(() => {
        setEditProfilePopupButtonText(origButtonText);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    const origButtonText = editAvatarPopupButtonText;
    setEditAvatarPopupButtonText("Сохранение...");
    api.updateAvatar(JSON.stringify(newAvatar))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка обновления аватара: ${err}`);
      }).finally(() => {
        setEditAvatarPopupButtonText(origButtonText);
      });
  }

  function handleAddCard(newCard) {
    const origButtonText = addPlacePopupButtonText;
    setAddPlacePopupButtonText("Создание...");
    api.addNewCard(JSON.stringify(newCard))
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка добавления карточки: ${err}`);
      }).finally(() => {
        setAddPlacePopupButtonText(origButtonText);
      });
  }

  function handleDeleteCardConfirm() {
    const origButtonText = confirmDeleteButtonPopupText;
    setConfirmDeleteButtonPopupText("Удаление...");
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка удаления карточки: ${err}`);
      }).finally(() => {
        setConfirmDeleteButtonPopupText(origButtonText);
      });
  }

  function handleSignIn(email, password) {
    authApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setLoggedinEmail(email);
        history.push('/');
      }).catch(err => {
        console.log(`Ошибка входа: ${err}`);
      });
  }

  function handleSignUp(email, password) {
    authApi.register(email, password)
      .then(() => {
        setInfoTooltipMessage("Вы успешно зарегистрировались!");
        setIsInfoTooltipSuccess(true);
      }).catch(err => {
        console.log(`Ошибка регистрации: ${err}`);
        setInfoTooltipMessage("Что то пошло не так! Попробуйте еще раз");
        setIsInfoTooltipSuccess(false);
      }).finally(() => {
        setInfoTooltipOpened(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedinEmail("");
  }

  function closeAllPopups() {
    setSelectedCard({});
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setPreviewCardPopupOpened(false);
    setIsDeleteConfirmPopupOpened(false);
    setInfoTooltipOpened(false);
  }

  return (
    <LoggedContext.Provider value={loggedinEmail}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
          <div className="root">
            <Header
              onLogout={handleLogout}
            />
            <Switch>
              <Route exact path="/">
                <ProtectedRoute>
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onDeleteCardClick={handleDeleteCardClick}
                    onCardLikeClick={handleCardLikeClick}
                    cards={cards}
                  />

                  <EditProfilePopup
                    onClose={closeAllPopups}
                    isOpen={isEditProfilePopupOpened}
                    onUpdateUser={handleUpdateUser}
                    buttonText={editProfilePopupButtonText}
                  />

                  <EditAvatarPopup
                    onClose={closeAllPopups}
                    isOpen={isEditAvatarPopupOpened}
                    onUpdateAvatar={handleUpdateAvatar}
                    buttonText={editAvatarPopupButtonText}
                  />

                  <AddPlacePopup
                    onClose={closeAllPopups}
                    isOpen={isAddPlacePopupOpened}
                    onAddCard={handleAddCard}
                    buttonText={addPlacePopupButtonText}
                  />

                  <ImagePreviewPopup
                    onClose={closeAllPopups}
                    isOpen={isPreviewCardPopupOpened}
                    card={selectedCard}
                  />

                  <ConfirmDeletePopup
                    onClose={closeAllPopups}
                    onConfirmed={handleDeleteCardConfirm}
                    isOpen={isDeleteConfirmPopupOpened}
                    buttonText={confirmDeleteButtonPopupText}
                  />
                </ProtectedRoute>
              </Route>

              <Route path="/sign-up">
                <Register
                  handleSubmit={handleSignUp}
                />
                <InfoTooltip
                  isOpen={isInfoTooltipOpened}
                  onClose={closeAllPopups}
                  message={infoTooltipMessage}
                  isSuccess={isInfoTooltipSuccess}
                />
              </Route>

              <Route path="/sign-in">
                <Login
                  handleSubmit={handleSignIn}
                />
              </Route>

              <Route path="*">
                {loggedinEmail ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </LoggedContext.Provider>
  );
}

export default App;
