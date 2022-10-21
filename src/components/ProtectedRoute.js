import React from 'react';
import { Redirect } from "react-router-dom";
import { LoggedContext } from '../contexts/LoggedContext';

const ProtectedRoute = ({ children }) => {
    const loggedinEmail = React.useContext(LoggedContext);
    if (!loggedinEmail) {
        return <Redirect to="/sign-in" replace />;
    }
    return children;
}

export default ProtectedRoute;