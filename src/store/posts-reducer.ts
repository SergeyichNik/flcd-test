import {AppThunk, RootStateType} from "./store";
import {apiPosts} from "../api/api";

export type PostsReducerActionsType =
    | ReturnType<typeof setPosts>
    | ReturnType<typeof setSinglePost>


type StateType = {
    postsData: PostType[],
    singlePost: PostType
}

const InitialState: StateType = {
    postsData: [],
    singlePost: {} as PostType
}


export const postsReducer =
    (
    state: StateType = InitialState,
    action: PostsReducerActionsType,
    ): StateType => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
            postsData: [...state.postsData, ...action.payload.postsData]
            };
        case "SET_SINGLE_POST":
            return {...state, singlePost: {...action.payload.singlePost}}
        default:
            return state;
    }
}

//selector
export const selectPosts = (state: RootStateType) => state.posts

//actionCreators
export const setPosts = (postsData: PostType[]) => {
    return {
        type: "SET_POSTS",
        payload: {
            postsData
        }
    } as const
}

export const setSinglePost = (singlePost: PostType) => {
    return {
        type: "SET_SINGLE_POST",
        payload: {
            singlePost
        }
    } as const
}
//thunkCreators
export const fetchPosts = (): AppThunk =>
    (
    dispatch
    ) => {
    apiPosts.getPosts()
        .then(res => {
            console.log(res)
            if (res.status >= 200 && res.status < 300) {
                dispatch(setPosts(res.data))
            }
        })
}

export const fetchSinglePost = (id: number): AppThunk =>
    (
        dispatch
    ) => {
    apiPosts.getPost(id)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                dispatch(setSinglePost(res.data))
            }
        })
}

export const createNewPostTC = (text: string): AppThunk =>
    (
        dispatch,
        getState
    ) => {
    const token = getState().auth.token
    apiPosts.setPost(text, token)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err.response.data.message))
    }

//Types

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