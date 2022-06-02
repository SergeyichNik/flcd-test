import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSinglePost, selectPosts} from "../store/posts-reducer";
import {selectAuth} from "../store/auth-reducer";

const PostPage = () => {
    const dispatch = useDispatch()
    const singlePost = useSelector(selectPosts).singlePost
    const currentUserId = useSelector(selectAuth).id
    const ownerId = singlePost.user_id

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
      if (id) {
          dispatch<any>(fetchSinglePost(+id))
      }

    }, [])

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>{singlePost.text}</h2>
            {currentUserId === ownerId && <Link to={`/posts/${id}/edit`}>edit this post</Link>}

        </div>
    );
};

export default PostPage;