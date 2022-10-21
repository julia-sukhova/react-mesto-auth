import React from "react";

function Popup({ name, isOpen, onClose, title, titleExtClass, children, popupContentClass, infoImage }) {

    function handleMouseDown(event) {
        if (event.target.classList.contains(`popup_type_${name}`)) {
            onClose();
        }
    }
    if (!popupContentClass) {
        popupContentClass = "popup__container";
    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className={popupContentClass}>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className={`popup__info-image ${infoImage ? '' : 'popup__title_inactive'}`} alt='tooltip' src={infoImage} />
                <h2 className={`popup__title ${titleExtClass}`}>{title}</h2>
                {children}
            </div>
        </div>
    );
}

export default Popup;