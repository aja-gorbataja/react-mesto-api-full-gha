
function InfoToolTip({ text, pic, isOpen, onClose }) {
  return (
    <div className={`popup popup_info ${isOpen ? "popup_open" : ""}`}>
        <div className="popup__container">
          <button className="popup__info-close popup-close" aria-label="info-close" onClick={onClose} ></button>
          <div className="info">
            <img className="info__pic" alt="" src={pic} />
            <p className="info__text">{text}</p>
          </div>
        </div>
      </div>
  )
}

export default InfoToolTip