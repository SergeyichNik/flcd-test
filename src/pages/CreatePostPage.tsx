import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {createNewPostTC} from "../store/posts-reducer";

const CreatePostPage = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch<any>()

    const onClickHandle = () => {
        dispatch(createNewPostTC(text))
        setText("")
    }

    return (
        <div>
            <h2>Create new post</h2>
            <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
            <button onClick={onClickHandle}>Create</button>
        </div>
    );
};

export default CreatePostPage;