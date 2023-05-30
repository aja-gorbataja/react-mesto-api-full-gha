
import {useEffect, useState} from 'react';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import success from '../images/success.png';
import fail from '../images/fail.png';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState({});
  const [ currentUser, setCurrentUser ] = useState({});
  const [ cards, setCards ] = useState([]);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userEmail, setUserEmail ] = useState('');
  const [ isSuccessPopupOpen, setIsSuccessPopupOpen ] = useState(false);
  const [ isFailPopupOpen, setIsFailPopupOpen ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
    api.getCards()
          .then((cards) => {
            setCards(cards)
          })
          .catch((err) => {
            console.log(err)
          })
        }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
    api.getOwnerInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [loggedIn])

  function handleUpdateUser(newUser) {
    api.editProfile(newUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(newAvatar) {
    api.editAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.createCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(link, name) {
    setSelectedCard({
      link: link,
      name: name
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
  
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(elem => elem._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleReg(data) {
    auth.register(data)
      .then(() => {
        setIsSuccessPopupOpen(true);
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsFailPopupOpen(true);
        console.log(err)
      })
  }

  function handleLogIn(data) {
    auth.authorize(data) 
      .then((res) => {
        localStorage.setItem('token', res.token);
        setUserEmail(data.email);
        setLoggedIn(true);
        navigate('/main');
      })
      .catch((err) => {
        setIsFailPopupOpen(true);
        console.log(err)
      })
    }
    
  function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return
    }
    auth.getToken(token)
      .then((res) => {
        setUserEmail(res.data.email);
        setLoggedIn(true);
        navigate('/main')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in')
  }

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route path='/sign-in' element={<Login handleLogIn={handleLogIn} />} />
        <Route path='/sign-up' element={<Register handleReg={handleReg} />} />
        <Route path='/main' element={<ProtectedRoute 
          element={Main} 
          cards={cards} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete} 
          loggedIn={loggedIn} 
          userEmail={userEmail} 
          handleOut={handleOut} />} />
        <Route path='/' element={loggedIn ? (<Navigate to='/main' replace />) : (<Navigate to='/sign-in' replace />)} />
      </Routes>
      <Footer />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar} /> 
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} />
      <InfoToolTip 
        isOpen={isSuccessPopupOpen ? isSuccessPopupOpen : isFailPopupOpen} 
        onClose={closeAllPopups} 
        text={isSuccessPopupOpen ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."} 
        pic={isSuccessPopupOpen ? success : fail} />
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
