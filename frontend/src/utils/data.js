const token = localStorage.getItem('token');

export const config = {
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${token}`
  }
}

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};