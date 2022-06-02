import React from 'react';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectApp} from "../../store";
import {CustomLink} from "../custom-link";
import {StatusBarError, StatusBarSuccess} from "../status-bar";
import classes from "./Layout.module.css";


export const Layout = () => {

    const error = useSelector(selectApp).error
    const success = useSelector(selectApp).success

    return (
        <>
            {error && <StatusBarError error={error}/>}
            {success && <StatusBarSuccess message={success}/>}
            <header className={classes.headerWrapper}>
                <CustomLink to="/">Home  </CustomLink>
                <CustomLink to="/posts">Blog  </CustomLink>
            </header>
            <main className={classes.outlet}>
                <Outlet/>
            </main>
        </>
    );
};
