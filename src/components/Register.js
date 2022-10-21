import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Register({ handleSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onSubmit(ev) {
        ev.preventDefault();
        handleSubmit(email, password);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value || "");
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value || "");
    }

    return (
        <div className="wrap">
            <h2 className="wrap__title">Регистрация</h2>
            <form className="form" name="form__login" action="#" method="post" /*noValidate*/ onSubmit={onSubmit}>
                <fieldset className="form__user-data">
                    <label className="form__label">
                        <input
                            id="name-input"
                            className="form__item form__item_text_name form__item_color_black"
                            minLength="2"
                            maxLength="40"
                            type="email"
                            placeholder="Email"
                            name="email" required autoFocus
                            onChange={handleEmailChange} />
                        <span className="name-input-error form__item-error"></span>
                    </label>
                    <label className="form__label">
                        <input
                            id="subtitle-input"
                            className="form__item form__item_text_subtitle form__item_color_black"
                            minLength="2"
                            maxLength="200"
                            type="password"
                            placeholder="Пароль"
                            name="password" required
                            onChange={handlePasswordChange} />
                        <span className="subtitle-input-error form__item-error"></span>
                    </label>
                </fieldset>
                <button className="form__submit-button form__submit-button_item" type="submit" value="save">Зарегистрироваться</button>
            </form>
            <div className="register">
                <p className="register__text">Уже зарегистрированы?&nbsp;</p>
                <Link className="register__link" to="/sign-in">Войти</Link>
            </div>

        </div>
    )
}

export default Register;