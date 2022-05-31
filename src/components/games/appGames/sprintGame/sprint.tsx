import React, {useState, useMemo, useEffect} from 'react';
import styles from './sprint.module.css';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../../../state/store";
import {plusCorrectWordAC, plusErrorWordAC, pointsAC} from "../../../../state/user-reducer";

type PropsType = {
    playWords: any[]
    nextWord: () => void
}


export const Sprint = ({nextWord, playWords}: PropsType) => {
    const dispatch = useDispatch()
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    const englishWord = useMemo(() => playWords.sort(), []);
    const russianWord = useMemo(() => playWords[Math.floor(Math.random() * playWords.length)], [wordIndex]);
    const [timerValue, setTimerValue] = useState(15);
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)

    const isChecked = (value: boolean) => {
        if (value) {
            setTimerValue(15);
            dispatch(plusCorrectWordAC(correctWords))
            dispatch(pointsAC(points))
            nextWord();
        } else {
            dispatch(plusErrorWordAC(errorWords))
            setTimerValue(15);
            nextWord();
        }
    };

    useEffect(() => {
        let timer = setInterval(() => {
            setTimerValue((state) => state - 1);
        }, 1000);
        if (timerValue === 0) {
            setTimerValue(15);
            dispatch(plusErrorWordAC(errorWords))
            nextWord();
        }
        return () => clearInterval(timer);
    });

    return (
        <section className={styles.sprintContainer}>
            {
                playWords.length === 0
                    ? <div>Добавь</div>
                    : <>
                        <div className={styles.sprintTimerContainer}>
                            <p className={styles.timerValue}>{timerValue}</p>
                        </div>
                        <div className={styles.containerTrue}><p>Is it true that</p></div>
                        <h3 className={styles.englishWord}>{englishWord[wordIndex].translate}</h3>
                        <h4 className={styles.russianWord}>{russianWord.word}</h4>
                        <div className={styles.containerBtns}>
                            <button className={styles.btnNo}
                                    onClick={() => isChecked(englishWord[wordIndex].translate !== russianWord.translate)}>No
                            </button>
                            <button className={styles.btnYes}
                                    onClick={() => isChecked(englishWord[wordIndex].translate === russianWord.translate)}>Yes
                            </button>
                        </div>
                    </>
            }
        </section>
    )
}