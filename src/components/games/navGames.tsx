import React from 'react'
import styles from "../../app.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {ProgressBar} from "../common/progressBar";


type PropsType = {
    points: number
    wordIndex: any
}

export const NavGames = ({points, wordIndex }: PropsType) => {
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)

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