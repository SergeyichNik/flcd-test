import {PostsReducerActionsType, PostType, StateType} from "../types";


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
                postsData: [...state.postsData, ...action.payload.postsData.reverse()]
            };
        case "SET_NEW_POST":
            return {
                ...state, postsData: [action.payload.model, ...state.postsData]
            }
        case "UPDATE_POST":
            return {
                ...state,
                postsData: state.postsData.map(post => post.id === action.payload.id ? {...post, ...action.payload.model} : post)
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
        default:
            return state;
    }
}
