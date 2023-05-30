
import { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from './Header';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, userEmail, handleOut}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
    <Header userEmail={userEmail} title="Выйти" onClick={handleOut} navLink='/sign-in' />
    <main className="content">
        <section className="profile">
          <div onClick={onEditAvatar} className="profile__edit">
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <button onClick={onEditProfile} className="profile__info-edit" aria-label="edit"></button>
            </div>
            <p className="profile__info-description">{currentUser.about}</p>
          </div>
          <button onClick={onAddPlace} className="profile__add" aria-label="add"></button>
        </section>
        <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} name={card.name} link={card.link} likes={card.likes} onCardClick={onCardClick} cardOwner={card.owner._id} card={card} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
        </section>  
      </main>
      </>
  )
}

export default Main;