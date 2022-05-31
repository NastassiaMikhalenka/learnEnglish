import React, {useState} from 'react';
import styles from './speak.module.css';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../../../state/store";
import {plusCorrectWordAC, pointsAC} from "../../../../state/user-reducer";
import {initialStateType} from "../../../../state/library_reducer";


type PropsType = {
    playWords: any[]
    nextWord: () => void
}

export const Speak = ({nextWord, playWords}: PropsType) => {
    const dispatch = useDispatch()
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    const [text, setText] = useState('');
    const [value, setValue] = useState(false);

    const clickNext = () => {
        nextWord()
        setValue(false)
    }

    const listenVoice = (e: any) => {
        setValue(false)
        setText('')
        // @ts-ignore
        const speech = new window.webkitSpeechRecognition();
        speech.interimResults = 'true';
        speech.lang = 'en-Us';
        speech.start();
        speech.onresult = (event: any) => {
            let result = event.results[event.resultIndex];
            if (result.isFinal) {
                if(result[0].transcript === playWords[wordIndex].translate) {
                    dispatch(plusCorrectWordAC(correctWords));
                    dispatch(pointsAC(points))
                    setValue(true);
                    setText('');
                }
            } else {
                setText(result[0].transcript);
            }
        };
    };

    return(
        <section className={styles.speakContainer}>
            {
                library.length === 0
                    ? <div>Add words to the library</div>
                    : <>  <span>Say this word</span>
                        <h3 className={styles.englishWord}>{playWords[wordIndex].translate}</h3>
                        <div className={styles.textVoice}>
                            <p>{text}</p>
                            {
                                value ? <div className={styles.done}></div> : null
                            }
                        </div>
                        <div onClick={(e) => listenVoice(e)} className={styles.btnMicro}></div>
                        <div onClick={clickNext} className={styles.btnNext}></div>
                    </>
            }

        </section>
    )
}