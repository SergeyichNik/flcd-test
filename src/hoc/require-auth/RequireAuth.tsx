import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAuth} from "../../store";

export const RequireAuth = ({children}: {children: JSX.Element}) => {
    const isLoggedIn = useSelector(selectAuth).isLoggedIn
    const location = useLocation()


    if (!isLoggedIn) {
        return <Navigate to={"/login"} state={{from: location}}/>
    }

    return children
};
