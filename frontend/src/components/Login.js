import { useState} from "react";
import PopupWithForm from "./PopupWithForm";
import Header from "./Header";

function Login({ handleLogIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogIn(email, password)
  }

  return (
    <>
    <Header title="Регистрация" navLink='/sign-up' />
    <PopupWithForm name="login" title="Вход" button="Войти" onSubmit={handleSubmit}  >
        <fieldset className="form__input">
        <input id="email" type="email" name="email" value={email} className="form__input-email popup__input" placeholder="Email" onChange={handleEmailInput}  />
          <span className="username-error popup__input-error"></span>
          <input id="password" name="password" type="password" value={password} className="form__input-password popup__input" placeholder="Пароль" onChange={handlePasswordInput} />
          <span className="description-error popup__input-error"></span>
        </fieldset>
      </PopupWithForm>
    </>
  )
}

export default Login