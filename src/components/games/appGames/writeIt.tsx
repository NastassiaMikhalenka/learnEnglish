import React, {useRef, useState} from "react";
import styles from './appGames.module.css'
import {speak} from "../../../utils/speak";

type PropsType = {
    playWords: any
    wordIndex: any
    setWordIndex: any
    correctWords: any
    errorWords: any
    setCorrectWords: any
    setErrorWords: any
}

export const WriteIt = ({playWords, wordIndex, setWordIndex, correctWords, errorWords, setCorrectWords, setErrorWords}: PropsType) => {
    const input = useRef() as React.MutableRefObject<HTMLInputElement>
    const [randomWords, setRandomWords] = useState(playWords.sort(() => Math.random() - 0.5))

    const checkWord = (e: any) => {
        e.preventDefault()
        if (input.current.value === randomWords[wordIndex].translate) {
            speak(randomWords[wordIndex].translate)
            setCorrectWords(correctWords + 1)
            if (wordIndex !== playWords.length - 1) {
                setWordIndex(wordIndex + 1)
            } else {
                alert('Game over!')
            }
            input.current.value = ''

        } else {
            setErrorWords(errorWords + 1)
        }
    }

    const newGame = () =>{
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