import { useState} from "react";
import PopupWithForm from "./PopupWithForm";
import Header from "./Header";

function Login({ handleLogIn }) {
  const [ formValue, setFormValue ] = useState({email: '', password: ''});

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({ ...formValue, [name]: value})
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogIn(formValue)
  }

  return (
    <>
    <Header title="Регистрация" navLink='/sign-up' />
    <PopupWithForm name="login" title="Вход" button="Войти" onSubmit={handleSubmit}  >
        <fieldset className="form__input">
        <input id="email" type="email" name="email" value={formValue.email} className="form__input-email popup__input" placeholder="Email" onChange={handleChange}  />
          <span className="username-error popup__input-error"></span>
          <input id="password" name="password" type="password" value={formValue.password} className="form__input-password popup__input" placeholder="Пароль" onChange={handleChange} />
          <span className="description-error popup__input-error"></span>
        </fieldset>
      </PopupWithForm>
    </>
  )
}

export default Login