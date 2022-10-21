import React from "react";
import headerLlogo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { LoggedContext } from '../contexts/LoggedContext';

function Header({ onLogout }) {
    const loggedinEmail = React.useContext(LoggedContext);
    const location = useLocation();
    const isInRegistration = location.pathname === '/sign-up';
    const nextLocation = loggedinEmail ? '/' : (isInRegistration ? '/sign-in' : '/sign-up');
    const buttonText = loggedinEmail ? "Выйти" : (isInRegistration ? "Вход" : "Регистрация");

    return (
        <header className="header">
            <img src={headerLlogo} className="header__logo" alt="Логотип" />
            <div className="header__container">
                <p className="header__text">{loggedinEmail}</p>
                <Link className="header__link" to={nextLocation} onClick={loggedinEmail ? onLogout : () => { }}>
                    {buttonText}
                </Link>
            </div>
        </header >
    )
}

export default Header;