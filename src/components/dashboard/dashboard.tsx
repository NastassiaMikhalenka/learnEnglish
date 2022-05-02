import React from "react";
import styles from './dashboard.module.css';
import btn from '../../utils/img/play.svg'

type PropsType = {
    points: any
}

export const Dashboard = ({points}: PropsType) => {
    return (
        <section className={styles.dashboardContainer}>
            <div className={styles.gameBlock}>
                <p> The most popular game is <br/>
                    <b>Speak IT</b>
                </p>
                <img className={styles.btnPlay} src={btn} alt={""}/>
                <button className={styles.btnRandom}>Play random game</button>
            </div>
            <div className={styles.pointsBlock}>
                <span>Common experience</span>
                <h3>{points} points</h3>
            </div>
            <div className={styles.levelBlock}>
                <span>Level</span>
                <h3>{(0.2 * Math.sqrt(points)).toFixed()} level</h3>
                <p>Learn 750 new world in one course</p>
                <div className={styles.levelBackground}> </div>
            </div>
        </section>
    )
}