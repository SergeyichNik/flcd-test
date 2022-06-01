import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {postsReducer, PostsReducerActionsType} from "./posts-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {authReducer, AuthReducerActionsType} from "./auth-reducer";


const reducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
});


export const  store = createStore(reducer, applyMiddleware(thunk));


// @ts-ignore
window.store = store;

export type RootStateType = ReturnType<typeof reducer>;
export type RootActionsTypes = PostsReducerActionsType | AuthReducerActionsType;
export type AppThunk = ThunkAction<void, RootStateType, unknown, RootActionsTypes>;

