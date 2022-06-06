import {AppThunk} from "../store";
import {apiPosts} from "../../api";
import {
    addNewPostAC,
    removePostAC,
    setAppStatusAC,
    setCurrentPostAC,
    setPostsAC,
    setSuccessMessageAC,
    updateNewPostTextAC,
    updatePostAC
} from "../actions";
import {handleServerAppError} from "../../utils/error-utils";
import {PostType} from "../types";
import {AxiosError} from "axios";


export const fetchPostsTC = (): AppThunk =>
    (
        dispatch
    ) => {
        dispatch(setAppStatusAC("LOADING"))
        apiPosts.getPosts()
            .then(res => {
                dispatch(setAppStatusAC("SUCCESS"))
                dispatch(setPostsAC(res.data))
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
                dispatch(setAppStatusAC("FAILED"))
            })
            .finally(() => {
                dispatch(setAppStatusAC("IDLE"))
            })
    }

export const fetchCurrentPostTC = (id: number): AppThunk =>
    (
        dispatch
    ) => {
        apiPosts.getPost(id)
            .then(res => {
                dispatch(setCurrentPostAC(res.data))
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
            })

    }

export const createNewPostTC = (): AppThunk =>
    (
        dispatch,
        getState
    ) => {
        const token = getState().auth.token
        const title = getState().posts.newPostText
        dispatch(setAppStatusAC("LOADING"))
        apiPosts.setPost(title, token)
            .then(res => {
                const model: PostType = {
                    comments: [],
                    ...res.data
                }
                dispatch(setSuccessMessageAC("Post added"))
                dispatch(setAppStatusAC("SUCCESS"))
                dispatch(addNewPostAC(model))
                dispatch(updateNewPostTextAC(""))
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
                dispatch(setAppStatusAC("FAILED"))
            })
            .finally(() => {
                dispatch(setAppStatusAC("IDLE"))
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
            AxiosError.caller("post not found")
        }
        dispatch(setAppStatusAC("LOADING"))
        apiPosts.updatePost(id, model.text, token)
            .then(res => {
                dispatch(setSuccessMessageAC("Post updated"))
                dispatch(setAppStatusAC("SUCCESS"))
                dispatch(updatePostAC(id, {comments: [], ...res.data}))
            })
            .catch(err => {
                handleServerAppError(err, dispatch)
                dispatch(setAppStatusAC("FAILED"))
            })
            .finally(() => {
                dispatch(setAppStatusAC("IDLE"))
            })
    }

export const removePostTC = (id: number): AppThunk =>
    (
        dispatch,
        getState
    ) => {
        const token = getState().auth.token
        dispatch(setAppStatusAC("LOADING"))
        apiPosts.deletePost(id, token)
            .then( () => {
                    dispatch(setAppStatusAC("SUCCESS"))
                    dispatch(removePostAC(id))
                    dispatch(setSuccessMessageAC("Post deleted"))
                }
            )
            .catch(err => {
                handleServerAppError(err, dispatch)
                dispatch(setAppStatusAC("FAILED"))
            })
            .finally(() => {
                dispatch(setAppStatusAC("IDLE"))
            })
    }