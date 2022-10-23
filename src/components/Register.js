import React from "react";
import { Link } from 'react-router-dom';
import AuthForm from "./AuthForm";

function Register({ handleSubmit }) {

    return (
        <AuthForm
            title="Регистрация"
            handleSubmit={handleSubmit}
            name="register"
            buttonText="Зарегистрироваться"
        >
            <div className="register">
                <p className="register__text">Уже зарегистрированы?&nbsp;</p>
                <Link className="register__link" to="/sign-in">Войти</Link>
            </div>
        </AuthForm>
    )
}

export default Register;