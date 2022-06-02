import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {selectPosts} from "../store/selectors";
import {updateNewPostTextAC} from "../store/actions";
import {createNewPostTC} from "../store/middlewares";

const CreatePostPage = () => {
    const dispatch = useDispatch<any>();
    const newPostText = useSelector(selectPosts).newPostText
    const isFetch = useSelector(selectPosts).isFetch

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
        <div>
            <h2>Create new post</h2>
            <textarea value={newPostText} onChange={onChangeHandle}></textarea>
            <button onClick={onClickHandle}>Create</button>
        </div>
    );
};

export default CreatePostPage;