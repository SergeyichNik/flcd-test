import {AppThunk} from "../store";
import {apiPosts} from "../../api";
import {
    addNewPostAC,
    removePostAC,
    setCurrentPostAC, setErrorMessageAC,
    setPostsAC, setSuccessMessageAC,
    toggleIsFetchAC,
    updateNewPostTextAC,
    updatePostAC
} from "../actions";
import {handleServerAppError} from "../../utils/error-utils";
import {PostType} from "../types";


export const fetchPostsTC = (): AppThunk =>
    (
        dispatch
    ) => {
        apiPosts.getPosts()
            .then(res => {
                console.log(res)
                if (res.status >= 200 && res.status < 300) {
                    dispatch(setPostsAC(res.data))
                }
            })
    }

export const fetchCurrentPostTC = (id: number): AppThunk =>
    (
        dispatch
    ) => {
        apiPosts.getPost(id)
            .then(res => {
                console.log(res)
                if (res.status >= 200 && res.status < 300) {
                    dispatch(setCurrentPostAC(res.data))
                }
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
                dispatch(toggleIsFetchAC(true))
            })
            .finally(() => {
                dispatch(toggleIsFetchAC(false))
            })
    }

export const createNewPostTC = (): AppThunk =>
    (
        dispatch,
        getState
    ) => {
        const token = getState().auth.token
        const title = getState().posts.newPostText
        apiPosts.setPost(title, token)
            .then(res => {
                const model: PostType = {
                    comments: [],
                    ...res.data
                }
                dispatch(setSuccessMessageAC("Success"))
                dispatch(addNewPostAC(model))
                dispatch(updateNewPostTextAC(""))
                dispatch(toggleIsFetchAC(true))
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
                dispatch(toggleIsFetchAC(false))
            })
    }

export const updatePostTextTC = (id: number, model: PostType): AppThunk =>
    (
        dispatch,
        getState
    ) => {
        const token = getState().auth.token
        const postsData = getState().posts.postsData as PostType[]
        const post = postsData.find((post) => id === post.id)
        if (!post) {
            console.warn("post not found")
            return
        }
        apiPosts.updatePost(id, model.text, token)
            .then(res => {
                console.log(res)
                dispatch(setSuccessMessageAC("Success"))
                dispatch(updatePostAC(id, {comments: [], ...res.data}))
                dispatch(toggleIsFetchAC(true))
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
            })
            .finally(() => {
                dispatch(toggleIsFetchAC(false))
            })
    }

export const removePostTC = (id: number): AppThunk =>
    (
        dispatch,
        getState
    ) => {
        const token = getState().auth.token
        apiPosts.deletePost(id, token)
            .then(res => {
                    if (res.status >= 200 && res.status <= 300)
                        dispatch(removePostAC(id))
                    console.log(res.data[0])
                    dispatch(setSuccessMessageAC("Success"))
                    dispatch(toggleIsFetchAC(true))
                }
            )
            .catch(err => {
                handleServerAppError(err, dispatch)
            })
            .finally(() => {
                dispatch(toggleIsFetchAC(false))
            })
    }