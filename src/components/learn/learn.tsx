import React, {useEffect, useState} from 'react'
import styles from "../../app.module.css";

type PropsType = {
    library: Array<any>
    wordIndex: any
    setWordIndex: any
    speak: (any: string) => void
}


export const Learn = ({library, wordIndex, speak}: PropsType) => {
    useEffect(() => {
        speak(library[wordIndex].translate)

    }, [wordIndex])

    return (
        <section style={{textAlign: 'center'}}>
            <span>{library[wordIndex].word}</span>
            <h3>{library[wordIndex].translate}</h3>
        </section>
    )
};