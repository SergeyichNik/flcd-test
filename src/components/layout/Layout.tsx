import React from 'react';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectApp} from "../../store";
import {CustomLink} from "../custom-link";
import {StatusBar} from "../status-bar";


export const Layout = () => {
    const error = useSelector(selectApp).error

    return (
        <>
            {error && <StatusBar error={error}/>}
            <header >
                <CustomLink to="/">Home  </CustomLink>
                <CustomLink to="/posts">Blog  </CustomLink>
            </header>
            <main style={{textAlign: "center"}}>
                <Outlet/>
            </main>
        </>
    );
};
