export const initialStateUser = {
    correctWords: 2,
    errorWords: 1,
};

export type initialStateUserType = typeof initialStateUser;

const PLUS_ERROR_WORD = 'PLUS_ERROR_WORD';
const PLUS_CORRECT_WORD = 'PLUS_CORRECT_WORD';

type actionType = plusErrorWordType | plusCorrectWordType

export const ReducerUser = (state: initialStateUserType = initialStateUser, action: actionType): initialStateUserType => {
    switch (action.type) {
        case PLUS_ERROR_WORD: {
            return {
                ...state,
                errorWords: action.payload.errorWords + 1
            }
        }
        case PLUS_CORRECT_WORD: {
            return {
                ...state,
                correctWords: action.payload.correctWords + 1
            }
        }
        default:
            return state
    }
}

type plusErrorWordType = ReturnType<typeof plusErrorWordAC>;

export const plusErrorWordAC = (errorWords: number) => {
    return {
        type: "PLUS_ERROR_WORD",
        payload: {
            errorWords: errorWords,
        }
    } as const
}

type plusCorrectWordType = ReturnType<typeof plusCorrectWordAC>;

export const plusCorrectWordAC = (correctWords: number) => {
    return {
        type: "PLUS_CORRECT_WORD",
        payload: {
            correctWords: correctWords,
        }
    } as const
}

// type deleteWordType = ReturnType<typeof deleteWordAC>;
//
// export const deleteWordAC = (id: number) => {
//     return {
//         type: "DELETE_WORD",
//         payload: {
//             id: id,
//         },
//     } as const
// }