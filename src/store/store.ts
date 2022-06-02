import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {postsReducer} from "./reducers/posts-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {authReducer, AuthReducerActionsType} from "./auth-reducer";
import {appReducer, AppReducerActionsTypes} from "./app-reducer";
import {PostsReducerActionsType} from "./types";


const reducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    app: appReducer
});


export const  store = createStore(reducer, applyMiddleware(thunk));


// @ts-ignore
window.store = store;

export type RootStateType = ReturnType<typeof reducer>;
export type RootActionsTypes = PostsReducerActionsType | AuthReducerActionsType | AppReducerActionsTypes;
export type AppThunk = ThunkAction<void, RootStateType, unknown, RootActionsTypes>;

