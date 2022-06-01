import React from 'react';
import {Link} from "react-router-dom";

type PropsType = {
    postId: number,
    text: string,
    comments: number
}

const Post = ({postId, comments, text}: PropsType) => {
    return (
        <Link to={`/posts/${postId}`}>
            <li>
                <p>Post: {text}</p>
            </li>
        </Link>
    );
};

export default Post;