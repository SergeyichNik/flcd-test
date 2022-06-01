import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {CustomLink} from "./CustomLink";

const Layout = () => {
    return (
        <>
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