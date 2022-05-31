import React, {useEffect, useMemo, useState} from "react";
import styles from './appGames.module.css'
import {speak} from "../../../utils/speak";
import {plusCorrectWordAC, plusErrorWordAC, pointsAC, resetWordIndexAC, wordIndexAC} from "../../../state/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../../state/store";

type PropsType = {
    playWords: any
}

export const CheckIt = ({playWords}: PropsType) => {
    const randomWords = useMemo(() => playWords.sort(() => Math.random() - 0.5), [])
    const [currentWords, setCurrentWords] = useState(['random', 'current', 'random'])
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    const dispatch = useDispatch()
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)


    useEffect(() => {
        if (playWords.length) {
            setCurrentWords([
                randomWords[wordIndex].word,
                randomWords[(wordIndex + 1) % randomWords.length].word,
                randomWords[(wordIndex + 2) % randomWords.length].word,
            ].sort(() => Math.random() - .5))
        }
    }, [wordIndex])


    const checkWord = (word: string) => {
        if (word === randomWords[wordIndex].word) {
            speak(randomWords[wordIndex].translate)
            dispatch(plusCorrectWordAC(correctWords))
            dispatch(pointsAC(points))
            if (wordIndex !== playWords.length - 1) {
                dispatch(wordIndexAC(wordIndex))
                // setWordIndex(wordIndex + 1)
            } else {
                alert('Game over!')
                dispatch(resetWordIndexAC())
            }
        } else {
            dispatch(plusErrorWordAC(errorWords))
        }
    }

    return (
        <section>
            {
                playWords.length <= 2
                    ? <div>Add words to the library. Need at least 3 :)</div>
                    : <>
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
                    </>
            }
        </section>
    )
}