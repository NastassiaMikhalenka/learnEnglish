import React, {useEffect, useState} from 'react'
import styles from "../../app.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {ProgressBar} from "../common/progressBar";
import {initialStateType} from "../../state/library_reducer";


type PropsType = {
//     playWords: any
//     points: number
    wordIndex: any
}

export const NavGames = ({
// playWords
                             // points,
                             wordIndex
}: PropsType) => {
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)

    return (
        <>
            <ProgressBar wordIndex={wordIndex}/>
            <div>
                <NavLink to={PATH.GAMES}>
                    <div className={styles.btnBack}> </div>
                </NavLink>
                <nav className={styles.gameNav}>
                    <ul className={styles.results}>
                        <li>Errors: {errorWords}</li>
                        <li>Correct: {correctWords}</li>
                        <li>Points: {points}</li>
                    </ul>
                </nav>
            </div>
        </>
    )
};