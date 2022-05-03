import React, {useRef, useState} from "react";
import styles from './appGames.module.css'
import {speak} from "../../../utils/speak";
import {plusCorrectWordAC, plusErrorWordAC, wordIndexAC} from "../../../state/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../../state/store";

type PropsType = {
    playWords: any
    // wordIndex: any
    // setWordIndex: any
}

export const WriteIt = ({playWords,
                            // wordIndex, setWordIndex
}: PropsType) => {
    const input = useRef() as React.MutableRefObject<HTMLInputElement>
    const [randomWords, setRandomWords] = useState(playWords.sort(() => Math.random() - 0.5))
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    const dispatch = useDispatch()
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)

    const checkWord = (e: any) => {
        e.preventDefault()
        if (input.current.value === randomWords[wordIndex].translate) {
            speak(randomWords[wordIndex].translate)
            dispatch(plusCorrectWordAC(correctWords))
            if (wordIndex !== playWords.length - 1) {
                dispatch(wordIndexAC(wordIndex))
                // setWordIndex(wordIndex + 1)
            } else {
                alert('Game over!')
            }
            input.current.value = ''
        } else {
            dispatch(plusErrorWordAC(errorWords))
        }
    }

    const newGame = () => {
        setRandomWords(randomWords)
    }

    return (
        <section>
            <span>Write a translation for this word</span>
            <h3>{randomWords[wordIndex].word}</h3>
            <button onClick={newGame}>New Game</button>
            <form onSubmit={checkWord} className={styles.writeWordBlock}>
                <input ref={input} type="text"/>
                <button className={styles.btnOk}>Ok</button>
            </form>
        </section>
    )
}