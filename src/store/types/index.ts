import {
    addNewPostAC,
    removePostAC, setAppStatusAC,
    setCurrentPostAC, setErrorMessageAC, setIsLoggedInAC,
    setPostsAC, setSuccessMessageAC, setUserSelfDataAC,
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


export type StateType = {
    postsData: PostType[],
    singlePost: PostType,
    newPostText: string,
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
    success: string | null,
    error: string | null,
    status: AppStatusesType,
}

export type AppReducerActionsTypes =
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setSuccessMessageAC>


export type AppStatusesType = "SUCCESS" | "FAILED" | "LOADING" | "IDLE"
