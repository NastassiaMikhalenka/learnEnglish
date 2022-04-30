import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from './appGames.module.css'

type PropsType = {
    playWords: any
    nextWord: any
    setCorrectWords: any
    wordIndex: any
    correctWords: any
    errorWords: any
    setErrorWords: any
}

export const PutIt = ({
                          playWords,
                          nextWord,
                          setCorrectWords,
                          wordIndex,
                          correctWords,
                          errorWords,
                          setErrorWords
                      }: PropsType) => {
    const randomWords = useMemo(() => playWords.sort(() => Math.random() - 0.5), [])

    const [arrPutLetter, setArrPutLetter] = useState([]);
    const [splitWords, setSplitWords] = useState([]);
    useEffect(() => {
        setSplitWords(randomWords[wordIndex].translate.split('').sort())
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
                setCorrectWords(correctWords + 1);
                nextWord();
                setArrPutLetter([]);
            } else {
                setErrorWords(errorWords + 1);
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
            <span>Put together a translation</span>
            <h3>{randomWords[wordIndex].word}</h3>
            <div className={styles.putWordsContainer}>
                {arrPutLetter.map((letter, index) => (
                    <div key={index} onClick={() => returnWord(letter)} className={styles.putWordsLetter}>{letter}</div>
                ))}
            </div>
            <div className={styles.splitWordsContainer}>
                {splitWords.map((item, index) => (
                    <div className={styles.splitWordsLetter} key={index} onClick={() => putWord(item)}>{item}</div>
                ))}
            </div>
        </section>
    )
}