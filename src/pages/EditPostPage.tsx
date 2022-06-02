import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PostType, selectPosts, updatePostTextTC} from "../store/posts-reducer";

const EditPostPage = () => {
    const dispatch = useDispatch<any>()

    const singlePost = useSelector(selectPosts).singlePost

    const [value, setValue] = useState(singlePost.text)

    const onClickHandle = () => {
        dispatch(updatePostTextTC(singlePost.id,{text: value} as PostType))
    }
    return (
        <div>
            <h2>Edit post {singlePost.id}</h2>
            <textarea value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
            <button onClick={onClickHandle}>Confirm</button>
        </div>
    );
};

export default EditPostPage;