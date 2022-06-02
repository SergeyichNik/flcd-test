import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditPostPage from "./pages/EditPostPage";
import Layout from "./components/Layout";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import RequireAuth from "./hoc/RequireAuth";
import CreatePostPage from "./pages/CreatePostPage";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfoTC, selectAuth} from "./store/auth-reducer";
import LoggedIn from "./pages/LoggedIn";
import {fetchPosts} from "./store/posts-reducer";


function App() {
    const {isLoggedIn} = useSelector(selectAuth)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(getUserInfoTC())

    }, [isLoggedIn])

    useEffect(() => {
        dispatch(fetchPosts())
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
