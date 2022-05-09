export const initialStateUser = {
    correctWords: 0,
    errorWords: 0,
    wordIndex: 0,
    points: 0,
};

export type initialStateUserType = typeof initialStateUser;

const PLUS_ERROR_WORD = 'PLUS_ERROR_WORD';
const PLUS_CORRECT_WORD = 'PLUS_CORRECT_WORD';
const PLUS_WORD_INDEX = 'PLUS_WORD_INDEX';
const RESET_WORD_INDEX = 'RESET_WORD_INDEX';
const PLUS_POINTS = 'PLUS_POINTS';


type actionType = plusErrorWordType | plusCorrectWordType | wordIndexType | resetWordIndexType | pointsACType

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
        case PLUS_WORD_INDEX: {
            return {
                ...state,
                wordIndex: action.payload.wordIndex + 1
            }
        }
        case RESET_WORD_INDEX: {
            return {
                ...state,
                wordIndex: 0
            }
        }
        case PLUS_POINTS: {
            return {
                ...state,
                points: action.payload.points + 1
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

type wordIndexType = ReturnType<typeof wordIndexAC>;

export const wordIndexAC = (wordIndex: number) => {
    return {
        type: "PLUS_WORD_INDEX",
        payload: {
            wordIndex: wordIndex,
        }
    } as const
}

type resetWordIndexType = ReturnType<typeof resetWordIndexAC>;
export const resetWordIndexAC = () => {
    return {
        type: "RESET_WORD_INDEX",
    } as const
}

type pointsACType = ReturnType<typeof pointsAC>;

export const pointsAC = (points: number) => {
    return {
        type: "PLUS_POINTS",
        payload: {
            points: points,
        }
    } as const
}

