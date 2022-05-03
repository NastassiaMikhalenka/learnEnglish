import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from './appGames.module.css'
import {speak} from "../../../utils/speak";
import {plusCorrectWordAC, plusErrorWordAC} from "../../../state/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../../state/store";

type PropsType = {
    playWords: any
    wordIndex: any
    setWordIndex: any
}

export const CheckIt = ({
                            playWords,
                            wordIndex,
                            setWordIndex,
                        }: PropsType) => {
    const randomWords = useMemo(() => playWords.sort(() => Math.random() - 0.5), [])
    const [currentWords, setCurrentWords] = useState(['random', 'current', 'random'])
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    const dispatch = useDispatch()


    useEffect(() => {
        setCurrentWords([
            randomWords[wordIndex].word,
            randomWords[(wordIndex + 1)%randomWords.length].word,
            randomWords[(wordIndex + 2)%randomWords.length].word,
        ].sort(() => Math.random() - .5))
    }, [correctWords])


    const checkWord = (word: string) => {
        if (word === randomWords[wordIndex].word) {
            speak(randomWords[wordIndex].translate)
            dispatch(plusCorrectWordAC(correctWords))
            if (wordIndex !== playWords.length - 1) {
                setWordIndex(wordIndex + 1)
            } else {
                alert('Game over!')
            }
        } else {
            dispatch(plusErrorWordAC(errorWords))
        }
    }

    return (
        <section>
            <span>Write a translation for this word</span>
            <h3>{randomWords[wordIndex].translate}</h3>
            <ul className={styles.btnContainer}>
                {currentWords.map((word, index) => {
                    return (
                        <li key={index}
                            className={styles.btnCheck} onClick={() => checkWord(word)}>{word}</li>
                    )
                })}
            </ul>
        </section>
    )
}