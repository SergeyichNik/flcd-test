
import {
    addNewPostAC,
    removePostAC, setAppStatusAC,
    setCurrentPostAC, setErrorMessageAC, setIsLoggedInAC,
    setPostsAC, setUserSelfDataAC,
    toggleIsFetchAC,
    updateNewPostTextAC,
    updatePostAC
} from "../actions";


export type PostsReducerActionsType =
    | ReturnType<typeof setPostsAC>
    | ReturnType<typeof setCurrentPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof addNewPostAC>
    | ReturnType<typeof updatePostAC>
    | ReturnType<typeof removePostAC>
    | ReturnType<typeof toggleIsFetchAC>


export type StateType = {
    postsData: PostType[],
    singlePost: PostType,
    newPostText: string,
    isFetch: boolean
}

export type PostType = {
    id: number,
    text: string,
    user_id: number,
    created_at: string,
    updated_at: string,
    comments: CommentType[]

}

export type CommentType = {
    id: number,
    text: string,
    reply_to_comment: number | null,
    post_id: number,
    user_id: number,
    created_at: string,
    updated_at: string,
    replies: []
}

export type AuthReducerActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserSelfDataAC>

export type AuthReducerStateType = {
    email: string | null
    id: number | null
    name: string | null
    isLoggedIn: boolean
    token: string | null
}

export type AppReducerStateType = {
    error: string | null,
    status: AppStatusesType
}

export type AppReducerActionsTypes =
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setAppStatusAC>

export type AppStatusesType = "SUCCESS" | "FAILED" | "LOADING" | "IDLE"
