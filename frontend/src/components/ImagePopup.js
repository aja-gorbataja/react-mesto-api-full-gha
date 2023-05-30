
function ImagePopup(props) {
  return (
    <div className={`popup popup_img ${props.card.link ? "popup_open" : ""}`}>
        <div className="popup__img-container">
          <button className="popup__img-close popup-close" aria-label="img-close" onClick={props.onClose}></button>
          <figure className="img">
            <img className="img__full" alt={props.card.name} src={props.card.link} />
            <figcaption className="img__title">{props.card.name}</figcaption>
          </figure>
        </div>
      </div>
  )
}

export default ImagePopup;