import React from 'react';
import {Link} from "react-router-dom";
import classes from "./Post.module.css";

type PropsType = {
    userId: number,
    postId: number,
    text: string,
    commentsQuantity: number,
    createdDate: string,
    currentUserId: number | null,
}

export const Post = ({postId, createdDate, commentsQuantity, userId , text, currentUserId}: PropsType) => {

    const year_month_day = createdDate.slice(0, 10)
    const hours_minutes = createdDate.slice(11, 16)

    return (
        <li className={classes.postWrapper}>
            <div className={classes.top}>
                {currentUserId === userId
                    ? <p className={classes.currentUserPost}>Your post</p>
                    : <p>Post by user: {userId}</p>
                }
                <p>{year_month_day}</p>
            </div>
            <div>
                <Link to={`/posts/${postId}`}>
                    <h3>Post: {text}</h3>
                </Link>
            </div>
            <div className={classes.bottom}>
                <p>comments: {commentsQuantity}</p>
                <p>{hours_minutes}</p>
            </div>
        </li>

    );
};
