import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPosts} from "../store/posts-reducer";

const EditPostPage = () => {
    const {id} = useParams()
    const singlePost = useSelector(selectPosts).singlePost

    return (
        <div>
            <h2>Edit post {id}</h2>
        </div>
    );
};

export default EditPostPage;