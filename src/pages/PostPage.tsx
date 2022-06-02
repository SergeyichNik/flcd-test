import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../store/auth-reducer";
import {selectPosts} from "../store/selectors";
import {fetchCurrentPostTC, removePostTC} from "../store/middlewares";

const PostPage = () => {
    const dispatch = useDispatch<any>()
    const singlePost = useSelector(selectPosts).singlePost
    const isFetch = useSelector(selectPosts).isFetch
    const currentUserId = useSelector(selectAuth).id
    const ownerId = singlePost.user_id

    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const navigate = useNavigate()

    const {id} = useParams()
    console.log('id:', id)

    useEffect(() => {
      if (id) {
          dispatch(fetchCurrentPostTC(+id))
      }
    }, [])

    const toggleDeleteBtn = () => {
        setDeleteConfirm(!deleteConfirm)
    }

    const confirmRemovePost = () => {
        dispatch(removePostTC(singlePost.id))
    }

    if (isFetch) {
        return <Navigate to={"/posts"}/>
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>{singlePost.text}</h2>
            {currentUserId === ownerId &&
                <>
                    <div>
                        <Link to={`/posts/${id}/edit`}>edit this post</Link>
                    </div>
                    {deleteConfirm
                        ? <>
                            <button onClick={toggleDeleteBtn}>Cancel</button>
                            <button onClick={confirmRemovePost}>Confirm</button>
                        </>
                        : <button onClick={toggleDeleteBtn}>Delete</button>
                    }
                </>
            }

        </div>
    );
};

export default PostPage;