import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {createNewPostTC, selectPosts, updateNewPostTextAC} from "../../store";
import classes from "./CreatePostPage.module.css";


export const CreatePostPage = () => {

    const dispatch = useDispatch<any>();
    const newPostText = useSelector(selectPosts).newPostText
    const isFetch = useSelector(selectPosts).isFetch

    const navigate = useNavigate()

    const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewPostTextAC(e.currentTarget.value))
    }

    const onClickHandle = () => {
        dispatch(createNewPostTC())
    }

    if (isFetch) {
        return <Navigate to={"/posts"}/>
    }

    return (
        <div className={classes.wrapper}>
            <button  style={{marginRight: "220px"}} onClick={() => navigate(-1)}>Back</button>
            <h2>Add new post</h2>
            <div>
                <textarea placeholder={"New post..."} value={newPostText} onChange={onChangeHandle}></textarea>
            </div>
            <button disabled={!newPostText} onClick={onClickHandle}>Add post</button>
        </div>
    );
};
