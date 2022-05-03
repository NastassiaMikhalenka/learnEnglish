import React from 'react';
import styles from "./notFound.module.css";
import notFoundImg from '../../utils/img/check-the-correct-one.svg';


export const NotFound = () => {
    const GAMES = {
        img: notFoundImg,
        name: 'Not-found',
        description: 'Page under construction'
    }

    return (
        <section className={styles.notFoundContainer}>
            <div className={styles.notFoundBlock}>
                <div>
                    <h2>{GAMES.name}</h2>
                    <p>{GAMES.description}</p>
                </div>
                <img src={GAMES.img} alt=""/>
            </div>
        </section>
    )
}