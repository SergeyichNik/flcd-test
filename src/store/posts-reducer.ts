import {AppThunk, RootStateType} from "./store";
import {apiPosts} from "../api/api";

export type PostsReducerActionsType =
    | ReturnType<typeof setPosts>
    | ReturnType<typeof setSinglePost>
    | ReturnType<typeof updateNewPostText>
    | ReturnType<typeof addNewPost>


type StateType = {
    postsData: PostType[],
    singlePost: PostType,
    newPostText: string,
}

const InitialState: StateType = {
    postsData: [],
    singlePost: {} as PostType,
    newPostText: "",
}


export const postsReducer = (state: StateType = InitialState, action: PostsReducerActionsType,): StateType => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
            postsData: [...state.postsData, ...action.payload.postsData]
            };
        case "SET_NEW_POST":
            return {
                ...state, postsData: [...state.postsData, action.payload.model]
            }
        case "SET_SINGLE_POST":
            return {...state, singlePost: {...action.payload.singlePost}};
        case "SET_NEW_POST_TEXT":
            return {...state, newPostText: action.payload.text}
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
export const updateNewPostText = (text: string) => {
    return {
        type: "SET_NEW_POST_TEXT",
        payload: {
            text
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

export const addNewPost = (model: PostType) => {
    return {
        type: "SET_NEW_POST",
        payload: {
            model
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
            dispatch(addNewPost(model))
            dispatch(updateNewPostText(""))
        })
        .catch(err => {
            const error = err.response.data
                ? err.response.data.message
                : err.message
                console.log(error)
        })
    }

export const updatePostText = (id: string, text: string): AppThunk  =>
    (
        dispatch
    ) => {
    apiPosts.updatePost(id, text)
        .then(res => {
            console.log(res)
        })
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