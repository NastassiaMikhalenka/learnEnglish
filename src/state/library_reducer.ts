export const initialState = [{
    word: 'Привет, мир',
    translate: 'Hello world',
    learn: 0,
}];

export type initialStateType = typeof initialState;

const ADD_NEW_WORD = 'ADD_NEW_WORD';
const DELETE_WORD = 'DELETE_WORD';

type actionType = addNewWordACType | deleteWordType;

export const ReducerLibrary = (state: initialStateType = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case ADD_NEW_WORD: {
            return [
                ...state,
                {word: action.payload.word, translate: action.payload.translate, learn: 0}
            ]
        }
        case DELETE_WORD: {
            return state.filter((word: any, index) => index !== action.payload.id)
        }
        default:
            return state
    }
}

type addNewWordACType = ReturnType<typeof addNewWordAC>;

export const addNewWordAC = (word: string, translate: string) => {
    return {
        type: "ADD_NEW_WORD",
        payload: {
            word: word,
            translate: translate,
        },
    } as const
}

type deleteWordType = ReturnType<typeof deleteWordAC>;

export const deleteWordAC = (id: number) => {
    return {
        type: "DELETE_WORD",
        payload: {
            id: id,
        },
    } as const
}