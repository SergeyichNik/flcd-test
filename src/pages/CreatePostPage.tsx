import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createNewPostTC, selectPosts, updateNewPostText} from "../store/posts-reducer";

const CreatePostPage = () => {
    const dispatch = useDispatch<any>();
    const newPostText = useSelector(selectPosts).newPostText

    const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewPostText(e.currentTarget.value))
    }

    const onClickHandle = () => {
        dispatch(createNewPostTC())
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