import {addNewWordAC, deleteWordAC, initialStateType, ReducerLibrary} from "../state/library_reducer";

let startState: initialStateType

beforeEach(() => {
    startState = [
        {word: "сoбака", translate: "dog", learn: 0},
        {word: "кот", translate: "cat", learn: 0},
    ]
})

test('correct word/translate(obj) should be removed', () => {
    const endState = ReducerLibrary(startState, deleteWordAC(0));

    expect(endState.length).toBe(1);
    expect(endState[0].translate).toBe('cat');
});

test('correct word/translate(obj) should be added', () => {
    const endState = ReducerLibrary(startState, addNewWordAC("луна", "moon"));

    expect(endState.length).toBe(3);
    expect(endState[2].translate).toBe('moon');
});