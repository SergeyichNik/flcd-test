import React from 'react';
import {Outlet} from "react-router-dom";
import {CustomLink} from "./CustomLink";
import StatusBar from "./status-bar/StatusBar";
import {useSelector} from "react-redux";
import {selectApp} from "../store/app-reducer";

const Layout = () => {
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

export default Layout;