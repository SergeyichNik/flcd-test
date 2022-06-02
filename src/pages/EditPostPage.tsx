import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Navigate} from "react-router-dom";
import {selectPosts} from "../store/selectors";
import {updatePostTextTC} from "../store/middlewares";
import {PostType} from "../store/types";

const EditPostPage = () => {

    const dispatch = useDispatch<any>()

    const singlePost = useSelector(selectPosts).singlePost
    const isFetch = useSelector(selectPosts).isFetch


    const [value, setValue] = useState(singlePost.text)

    const onClickHandle = () => {
        dispatch(updatePostTextTC(singlePost.id,{text: value} as PostType))
    }

    if (isFetch) {
        return <Navigate to={"/posts"}/>
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