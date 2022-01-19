import {rootReducerType} from "../state/store";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('library');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: rootReducerType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('library', serializedState);
    } catch {
        // ignore write errors
    }
};