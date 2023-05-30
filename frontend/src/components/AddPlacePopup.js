
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [ place, setPlace ] = useState('');
  const [ link, setLink ] = useState('');

  useEffect(() => {
    setPlace('');
    setLink('')
  }, [isOpen])

  function handlePlaceChange(e) {
    setPlace(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link: link
    })
  }


  return (
    <PopupWithForm 
      name="add" 
      title="Новое место" 
      button="Создать" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleAddSubmit} 
      isModal>
        <fieldset className="form__input">
          <input id="cityname" name="name" type="text" className="form__input-city popup__input" placeholder="Название" value={place} onChange={handlePlaceChange} />
          <span className="cityname-error popup__input-error"></span>
          <input id="imagelink" name="link" type="url" className="form__input-link popup__input" placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange} />
          <span className="imagelink-error popup__input-error"></span>
        </fieldset>
      </PopupWithForm>
  )
}

export default AddPlacePopup