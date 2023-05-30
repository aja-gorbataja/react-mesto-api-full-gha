
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ link, name, likes, onCardClick, onCardLike, onCardDelete, card }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `elements__item-like ${isLiked && 'elements__item-like_on'}` 
  );

  function handleClick() {
    onCardClick(link, name);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
      <article className="item">
        <div className="elements__item">
          {isOwn && <div className="elements__item-trash" onClick={handleDeleteClick} />}
          <img src={link} alt={name} className="elements__item-img" onClick={handleClick} />
          <div className="elements__item-container">
            <h2 className="elements__item-name">{name}</h2>
              <div className={cardLikeButtonClassName} onClick={handleLikeClick}>
                <p className="elements__item-numbers">{likes.length}</p>
              </div>
          </div>
        </div>
      </article>
  )
}

export default Card;