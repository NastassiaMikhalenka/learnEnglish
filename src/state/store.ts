import {combineReducers, createStore} from "redux";
import {ReducerLibrary} from "./library_reducer";

let rootReducer = combineReducers({
    library: ReducerLibrary,
})

export let store = createStore(rootReducer);

export type rootReducerType = ReturnType<typeof rootReducer>;

export type AppStoreType = typeof store