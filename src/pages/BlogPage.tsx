import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectPosts} from "../store/posts-reducer";
import {Link} from "react-router-dom";

const BlogPage = () => {
    console.log("render")
    const postsData = useSelector(selectPosts).postsData
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch<any>(fetchPosts())
    }, [])

    const displayPosts = postsData.map((post, i) => {
        return (
            <li key={i}>
                <p>Post by user: {post.user_id}</p>
                <Link  to={`/posts/${post.id}`}>
                    <h3>{post.text}</h3>
                </Link>
                <p>comments: {post.comments.length}</p>
            </li>
        )
    })

    return (
        <div>
            AllPostsPage
            <Link to={"/posts/new"}>Add new post</Link>
            {displayPosts}
        </div>
    );
};

export default BlogPage;