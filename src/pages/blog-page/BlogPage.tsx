import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectAuth, selectPosts} from "../../store";
import {Post} from "../../components";
import classes from "./BlogPage.module.css";


export const BlogPage = React.memo(() => {
    const postsData = useSelector(selectPosts).postsData
    const currentUser = useSelector(selectAuth).id

    const displayPosts = postsData.map((post, i) => {
        return <Post key={i} userId={post.user_id}
                     postId={post.id}
                     text={post.text}
                     currentUserId={currentUser}
                     createdDate={post.created_at}
                     commentsQuantity={post.comments.length}/>
    })

    return (
        <div className={classes.blogPageWrapper}>
            <div className={classes.TitleLink}>
                <h2>Blog</h2>
                <Link to={"/posts/new"}>Add new post</Link>
            </div>
            <ul className={classes.postsList}>
                {displayPosts}
            </ul>
        </div>
    );
});
