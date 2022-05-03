import React, {useEffect} from 'react'
import styles from "../../app.module.css";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {initialStateType} from "../../state/library_reducer";
import {speak} from "../../utils/speak";
import {ProgressBar} from "../common/progressBar";

type PropsType = {
    wordIndex: any
    setWordIndex: any
}

export const Learn = ({ wordIndex, setWordIndex}: PropsType) => {
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)

    useEffect(() => {
        if (wordIndex === library.length) return
        speak(library[wordIndex].translate)
    }, [wordIndex])


    return (
        <>
            <ProgressBar wordIndex={wordIndex}/>
            <section style={{textAlign: 'center'}}>
                {
                    library.length === 0
                        ? <div>Добавь</div>
                        :
                        <>
                            <span>{library[wordIndex].word}</span>
                            <h3>{library[wordIndex].translate}</h3>
                            <div onClick={() => {
                                if (wordIndex === library.length - 1) {
                                    setWordIndex(0)
                                } else {
                                    setWordIndex(wordIndex + 1)
                                }
                            }}
                                 className={styles.btnNext}> </div>
                        </>

                }
            </section>
        </>
    )
};