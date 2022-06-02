import {AppThunk, RootStateType} from "./store";
import {apiPosts} from "../api/api";
import {handleServerAppError} from "../utils/error-utils";

export type PostsReducerActionsType =
    | ReturnType<typeof setPosts>
    | ReturnType<typeof setSinglePost>
    | ReturnType<typeof updateNewPostText>
    | ReturnType<typeof addNewPost>
    | ReturnType<typeof updatePostAC>
    | ReturnType<typeof removePostAC>
    | ReturnType<typeof toggleIsFetchAC>


type StateType = {
    postsData: PostType[],
    singlePost: PostType,
    newPostText: string,
    isFetch: boolean
}

const InitialState: StateType = {
    postsData: [],
    singlePost: {} as PostType,
    newPostText: "",
    isFetch: false,
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
        case "UPDATE_POST":
            return {
                ...state,
                postsData: state.postsData.map(post => post.id === action.payload.id ? {...post, ...action.payload.model} : post )
            }
        case "REMOVE_POST":
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id !== action.payload.id)
            }
        case "SET_SINGLE_POST":
            return {...state, singlePost: {...action.payload.singlePost}};
        case "SET_NEW_POST_TEXT":
            return {...state, newPostText: action.payload.text};
        case "TOGGLE_IS_FETCH":
            return {...state, isFetch: action.payload.isFetch}
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

export const updatePostAC = (id: number, model: PostType) => {
    return {
        type: "UPDATE_POST",
        payload: {
            model,
            id
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

export const removePostAC = (id: number) => {
    return {
        type: "REMOVE_POST",
        payload: {
          id
        }
    } as const
}

export const toggleIsFetchAC = (isFetch: boolean) => {
    return {
        type: "TOGGLE_IS_FETCH",
        payload: {
            isFetch
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
            console.log(res)
            if (res.status >= 200 && res.status < 300) {
                dispatch(setSinglePost(res.data))
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
            dispatch(addNewPost(model))
            dispatch(updateNewPostText(""))
            dispatch(toggleIsFetchAC(true))
        })
        .catch(err => {
            handleServerAppError(err, dispatch)
            dispatch(toggleIsFetchAC(false))
        })
    }

export const updatePostTextTC = (id: number, model: PostType): AppThunk  =>
    (
        dispatch,
        getState,
    ) => {
    const token = getState().auth.token
    const postsData = getState().posts.postsData
    const task = postsData.find(post => id === post.id)
    if (!task) {
        console.warn("post not found")
        return
    }
    apiPosts.updatePost(id, model.text,token)
        .then(res => {
            console.log(res)
            dispatch(updatePostAC( id,{comments: [], ...res.data}))
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
            if(res.status >= 200 && res.status <= 300)
                dispatch(removePostAC(id))
                console.log(res.data[0])
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