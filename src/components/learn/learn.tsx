import React, {useEffect} from 'react'
import styles from "../../app.module.css";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {initialStateType} from "../../state/library_reducer";
import {speak} from "../../utils/speak";
import {ProgressBar} from "../common/progressBar";
import {resetWordIndexAC, wordIndexAC} from "../../state/user-reducer";

// type PropsType = {
//     wordIndex: any
//     setWordIndex: any
// }

export const Learn = (
    // { wordIndex, setWordIndex}: PropsType
) => {
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    const dispatch = useDispatch()


    // useEffect(() => {
    //     if (library) {
    //         speak(library[wordIndex].translate)
    //     }
    //     // speak(library[wordIndex].translate)
    // }, [])


    const progressBarWidth = {
        width: `${(100 / library.slice(-10).length) * (wordIndex + 1)}vw`
    };

    const listen =() => {
        speak(library[wordIndex].translate)
    }

    return (
        <>
            {/*<ProgressBar wordIndex={wordIndex}/>*/}
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={progressBarWidth}></div>
            </div>
            <section style={{textAlign: 'center'}}>
                {
                    library.length === 0
                        ? <div>Добавь</div>
                        :
                        <>
                            <span>{library[wordIndex].word}</span>
                            <h3>{library[wordIndex].translate}</h3>
                            <div onClick={listen} className={styles.btnSpeak}> </div>
                            <div onClick={() => {
                                if (wordIndex === library.length - 1) {
                                    dispatch(resetWordIndexAC())
                                    // setWordIndex(0)
                                } else {
                                    // speak(library[wordIndex].translate)
                                    dispatch(wordIndexAC(wordIndex))
                                    // setWordIndex(wordIndex + 1)
                                }
                            }}
                                 className={styles.btnNext}></div>
                        </>

                }
            </section>
        </>
    )
};