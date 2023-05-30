import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupWithForm from "./PopupWithForm";
import Header from "./Header";

function Register({ handleReg }) {
  const [ formValue, setFormValue ] = useState({email: '', password: ''});
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({ ...formValue, [name]: value})
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleReg(formValue)
  }

  function handleClick() {
    navigate('/sign-in')
  }

  return (
    <>
    <Header title="Войти" navLink='/sign-in' />
    <PopupWithForm name="register" title="Регистрация" button="Зарегистрироваться" onSubmit={handleSubmit} onClick={handleClick} isRegistered >
        <fieldset className="form__input">
        <input id="email" type="email" name="email" value={formValue.email} className="form__input-email popup__input" placeholder="Email" onChange={handleChange} />
          <span className="username-error popup__input-error"></span>
          <input id="password" name="password" type="password" value={formValue.password} className="form__input-password popup__input" placeholder="Пароль" onChange={handleChange} />
          <span className="description-error popup__input-error"></span>
        </fieldset>
      </PopupWithForm>
      </>
  )
}

export default Register