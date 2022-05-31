import React, {useEffect, useMemo, useState} from "react";
import styles from './appGames.module.css'
import {plusCorrectWordAC, plusErrorWordAC, pointsAC} from "../../../state/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../../state/store";

type PropsType = {
    playWords: any
    nextWord: any
    // wordIndex: any
}

export const PutIt = ({
                          playWords,
                          nextWord,
                          // wordIndex,
                      }: PropsType) => {
    const randomWords = useMemo(() => playWords.sort(() => Math.random() - 0.5), [])
    const dispatch = useDispatch()
    const [arrPutLetter, setArrPutLetter] = useState([]);
    const [splitWords, setSplitWords] = useState([]);
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)

    useEffect(() => {
        if (playWords.length) {
            setSplitWords(randomWords[wordIndex].translate.split('').sort())
        }
    }, [wordIndex])

    const putWord = (item: any) => {
        const currentLettersArray = [...arrPutLetter, item]
        const currentWord = randomWords[wordIndex].translate
        // @ts-ignore
        setArrPutLetter(currentLettersArray);
        // @ts-ignore
        setSplitWords(splitWords.join('').replace(item, '').split(''))
        if (arrPutLetter.length === currentWord.length - 1) {
            let fullWord = currentLettersArray.join('');
            if (fullWord === currentWord) {
                dispatch(plusCorrectWordAC(correctWords))
                dispatch(pointsAC(points))
                nextWord();
                setArrPutLetter([]);
            } else {
                dispatch(plusErrorWordAC(errorWords))

                nextWord();
                setArrPutLetter([]);
            }
        }
    }

    const returnWord = (letter: any) => {
        // @ts-ignore
        const letterIndex = arrPutLetter.indexOf(letter)
        setArrPutLetter(arrPutLetter.filter((item, index) => letterIndex !== index))
        // @ts-ignore
        setSplitWords([...splitWords, letter])
    }


    return (
        <section>
            {
                playWords.length === 0
                    ? <div>Добавь</div>
                    : <>
                        <span>Put together a translation</span>
                        <h3>{randomWords[wordIndex].word}</h3>
                        <div className={styles.putWordsContainer}>
                            {arrPutLetter.map((letter, index) => (
                                <div key={index} onClick={() => returnWord(letter)}
                                     className={styles.putWordsLetter}>{letter}</div>
                            ))}
                        </div>
                        <div className={styles.splitWordsContainer}>
                            {splitWords.map((item, index) => (
                                <div className={styles.splitWordsLetter} key={index}
                                     onClick={() => putWord(item)}>{item}</div>
                            ))}
                        </div>
                    </>
            }
        </section>
    )
}