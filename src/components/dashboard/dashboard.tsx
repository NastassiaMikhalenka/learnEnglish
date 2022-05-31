import React from "react";
import styles from './dashboard.module.css';
import btn from '../../utils/img/play.svg'
import {NavLink} from "react-router-dom";
import {PATH} from "../nav/nav";
import games from '../../utils/index'

type PropsType = {
    points: any
}

export const Dashboard = ({points}: PropsType) => {

    const randomGame = () => {
        let random = games.sort(() => Math.random() - 0.5);
        let path = '/' + random[0].path
        return path;
    }

    return (
        <section className={styles.dashboardContainer}>
            <div className={styles.gameBlock}>
                <p> The most popular game is <br/>
                    <b>Check IT</b>
                </p>
                <NavLink to={PATH.POPULAR}>
                    <img className={styles.btnPlay} src={btn} alt={""}/>
                </NavLink>
                <NavLink className={styles.btnRandom} to={randomGame()}>Play random game</NavLink>
            </div>
            <div className={styles.pointsBlock}>
                <span>Common experience</span>
                <h3>{points} points</h3>
            </div>
            <div className={styles.levelBlock}>
                <span>Level</span>
                <h3>{(0.2 * Math.sqrt(points)).toFixed()} level</h3>
                <p>Learn 750 new world in one course</p>
                <div className={styles.levelBackground}></div>
            </div>
        </section>
    )
}