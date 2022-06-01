import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSinglePost, selectPosts} from "../store/posts-reducer";

const PostPage = () => {
    const dispatch = useDispatch()
    const singlePost = useSelector(selectPosts).singlePost

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
            <Link to={`/posts/${id}/edit`}>edit this post</Link>
        </div>
    );
};

export default PostPage;