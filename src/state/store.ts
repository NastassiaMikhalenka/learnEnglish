import {combineReducers, createStore} from "redux";
import {ReducerLibrary} from "./library_reducer";
import {loadState, saveState} from "../utils/localstorage-utils";

let rootReducer = combineReducers({
    library: ReducerLibrary,
})

let preloadedState = loadState();

export let store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
    saveState({
        library: store.getState().library
    })
})


export type rootReducerType = ReturnType<typeof rootReducer>;

export type AppStoreType = typeof store