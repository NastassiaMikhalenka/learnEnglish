import React from 'react';
import styles from "../../app.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {ProgressBar} from "../common/progressBar";


export const NavGames = () => {
    let errorWords = useSelector<rootReducerType, number>(state => state.usersInfo.errorWords)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)

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