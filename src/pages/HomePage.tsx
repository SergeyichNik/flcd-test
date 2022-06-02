import React from 'react';
import {Link} from "react-router-dom";
import {selectAuth, setIsLoggedIn, setUserSelfData} from "../store/auth-reducer";
import {useDispatch, useSelector} from "react-redux";

const HomePage = () => {

    const isLoggedIn = useSelector(selectAuth).isLoggedIn
    const userName = useSelector(selectAuth).name
    const dispatch = useDispatch<any>()

    const onClickHandle = () => {
        dispatch(setIsLoggedIn(false, null))
        dispatch(setUserSelfData(null, null, null))
        localStorage.removeItem("token")
    }

    return (
        <div>
            <h2>Home page</h2>
            {
                isLoggedIn
                    ? <>
                        <h2>Hello, {userName}</h2>
                        <p>You have successfully logged in!</p>
                        <div style={{cursor: "pointer"}} onClick={onClickHandle}>Log out</div>
                    </>
                    : <Link to={"/login"}>Sign In</Link>
            }

        </div>
    );
};

export default HomePage;