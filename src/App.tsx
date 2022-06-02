import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostsTC, getUserInfoTC, selectAuth} from "./store";

import {
    BlogPage,
    CreatePostPage,
    EditPostPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    PostPage,
    RegistrationPage
} from "./pages";
import {RequireAuth} from "./hoc";
import {Layout} from "./components";


function App() {
    const isLoggedIn = useSelector(selectAuth).isLoggedIn
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(getUserInfoTC())

    }, [isLoggedIn])

    useEffect(() => {
        dispatch(fetchPostsTC())
    }, [])

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<HomePage />}/>
                    <Route path={"posts"} element={<BlogPage/>}/>
                    <Route path={"posts/:id"} element={<PostPage/>}/>
                    <Route path={"posts/:id/edit"} element={<EditPostPage/>}/>
                    <Route path={"posts/new"} element={
                        <RequireAuth>
                            <CreatePostPage/>
                        </RequireAuth>
                    }/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"registration"} element={<RegistrationPage/>}/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
