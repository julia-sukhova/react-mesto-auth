import React, { useState } from "react";

function AuthForm({ title, name, handleSubmit, buttonText, children }) {
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
            <h2 className="wrap__title">{title}</h2>
            <form className="form" name={`form-${name}`} action="#" method="post" /*noValidate*/ onSubmit={onSubmit}>
                <fieldset className="form__user-data">
                    <label className="form__label form__label_item">
                        <input
                            id="auth-email-input"
                            className="form__item form__item_text_name form__item_color_black"
                            minLength="2"
                            maxLength="40"
                            type="email"
                            placeholder="Email"
                            name="email" required autoFocus
                            onChange={handleEmailChange} />
                        <span className="name-input-error form__item-error"></span>
                    </label>
                    <label className="form__label form__label_item">
                        <input
                            id="auth-password-input"
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
                <button className="form__submit-button form__submit-button_item" type="submit" value="save">{buttonText}</button>
            </form>
            {children}
        </div>
    )
}

export default AuthForm;