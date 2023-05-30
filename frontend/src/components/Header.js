import { Link } from "react-router-dom"

function Header({ userEmail, title, onClick, navLink }) {
  return (
    <header className="header">
        <div className="header__logo header__logo_theme_dark header__logo_theme_light"></div>
        <div className="header__container">
        <p className="header__username">{userEmail}</p>
        <Link to={navLink} type="button" className="header__nav" onClick={onClick}>{title}</Link>
        </div>
        
      </header>
  )
}

export default Header