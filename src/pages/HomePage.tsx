import React from 'react';
import {Link} from "react-router-dom";
import {selectAuth, setIsLoggedIn, setUserSelfData} from "../store/auth-reducer";
import {useDispatch, useSelector} from "react-redux";

const HomePage = () => {

    const {isLoggedIn} = useSelector(selectAuth)
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
                    ? <div style={{cursor: "pointer"}} onClick={onClickHandle}>Log out</div>
                    : <Link to={"/login"}>Sign In</Link>
            }

        </div>
    );
};

export default HomePage;