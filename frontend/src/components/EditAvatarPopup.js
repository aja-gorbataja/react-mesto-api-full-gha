
import { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isModal>
        <fieldset className="form__input">
          <input ref={avatarRef} id="avatarlink" name="avatar" type="url" className="form__input-avatar popup__input" placeholder="Ссылка на картинку" />
          <span className="avatarlink-error popup__input-error"></span>
        </fieldset>
      </PopupWithForm>
  )
}

export default EditAvatarPopup