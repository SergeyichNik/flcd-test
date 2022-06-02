
import {
    addNewPostAC,
    removePostAC,
    setCurrentPostAC,
    setPostsAC,
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
