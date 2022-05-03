import {combineReducers, createStore} from "redux";
import {ReducerLibrary} from "./library_reducer";
import {loadState, saveState} from "../utils/localstorage-utils";
import {ReducerUser} from "./user-reducer";

let rootReducer = combineReducers({
    library: ReducerLibrary,
    usersInfo: ReducerUser,
})

let preloadedState = loadState();

export let store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
    saveState({
        library: store.getState().library,
        usersInfo: store.getState().usersInfo,
    })
})


export type rootReducerType = ReturnType<typeof rootReducer>;

// export type red = {library: {learn: number, word: string, translate: string}[]}

export type AppStoreType = typeof store
