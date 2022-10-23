import React from "react";
import AuthForm from "./AuthForm";

function Login({ handleSubmit }) {

    return (
        <AuthForm
            title="Вход"
            handleSubmit={handleSubmit}
            name="login"
            buttonText="Войти"
        >
        </AuthForm>
    );
}

export default Login;