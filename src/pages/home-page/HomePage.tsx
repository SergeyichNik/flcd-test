import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, setIsLoggedInAC, setUserSelfDataAC} from "../../store";
import classes from "./HomePage.module.css";


export const HomePage = () => {
    console.log("HomePage")
    const isLoggedIn = useSelector(selectAuth).isLoggedIn
    const userName = useSelector(selectAuth).name
    const dispatch = useDispatch<any>()

    const onClickHandle = () => {
        dispatch(setIsLoggedInAC(false, null))
        dispatch(setUserSelfDataAC(null, null, null))
        localStorage.removeItem("token")
    }

    return (
        <div className={classes.wrapper}>
            <h2>Home page</h2>
            {
                isLoggedIn
                    ? <>
                        <h3>Hello, {userName}</h3>
                        <p>You have successfully logged in!</p>
                        <div style={{cursor: "pointer"}} onClick={onClickHandle}>Log out</div>
                    </>
                    : <Link to={"/login"}>Sign In</Link>
            }

        </div>
    );
};
