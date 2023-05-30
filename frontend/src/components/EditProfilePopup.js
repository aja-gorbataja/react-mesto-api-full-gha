
import { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
      name="edit" 
      title="Редактировать профиль" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isModal>
        <fieldset className="form__input">
          <input id="username" type="text" name="name" className="form__input-name popup__input" placeholder="Имя" value={name || ''} onChange={handleNameChange} />
          <span className="username-error popup__input-error"></span>
          <input id="description" name="about" type="text" className="form__input-description popup__input" placeholder="О себе" value={description || ''} onChange={handleDescriptionChange} />
          <span className="description-error popup__input-error"></span>
          </fieldset>
      </PopupWithForm>
  )
}

export default EditProfilePopup
