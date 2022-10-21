import React from "react";
import success from '../images/success.svg';
import unsuccess from '../images/unsuccess.svg';
import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, message, isSuccess }) {
    return (
        <Popup
            name="info-tooltip"
            isOpen={isOpen}
            onClose={onClose}
            title={message}
            titleExtClass="popup__info-title"
            infoImage={isSuccess ? success : unsuccess}
        >
        </Popup>
    )
}

export default InfoTooltip;
