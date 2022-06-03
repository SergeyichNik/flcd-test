import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {PostType, selectPosts, updatePostTextTC} from "../../store";
import classes from "./EditPostPage.module.css";


export const EditPostPage = () => {
    const dispatch = useDispatch<any>()

    const singlePost = useSelector(selectPosts).singlePost
    const isFetch = useSelector(selectPosts).isFetch

    const navigate = useNavigate()

    const [value, setValue] = useState(singlePost.text)

    const onClickHandle = () => {
        dispatch(updatePostTextTC(singlePost.id,{text: value} as PostType))
    }

    if (isFetch) {
        return <Navigate to={"/posts"}/>
    }

    return (
        <div className={classes.wrapper}>
            <button  style={{marginRight: "220px"}} onClick={() => navigate(-1)}>Back</button>
            <h2>Edit post {singlePost.id}</h2>
            <textarea value={value} placeholder={"Edit post..."} onChange={(e) => setValue(e.currentTarget.value)}/>
            <button disabled={!value} onClick={onClickHandle}>Confirm</button>
        </div>
    );
};
