import React from "react";
import styles from "../../app.module.css";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {initialStateType} from "../../state/library_reducer";

type PropsType = {
    wordIndex: any
}
export const ProgressBar = ({wordIndex}: PropsType) => {
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)

    const progressBarWidth = {
        width: `${(100 / library.slice(-(library.length - 1)).length) * (wordIndex + 1)}vw`
    };

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}> </div>
        </div>
    )
}