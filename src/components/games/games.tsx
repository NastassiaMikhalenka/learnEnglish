import React, {useEffect} from 'react'
import styles from "./games.module.css";
import imgCheckCorrect from '../../utils/img/check-the-correct-one.svg';
import imgSelectTranslation from '../../utils/img/select-translation.svg';
import imgSprintGuess from '../../utils/img/sprint-guess.svg';
import imgPutTranslation from '../../utils/img/put-translation.svg';
import imgSpeakAndCheck from '../../utils/img/speak-and-check.svg';
import imgSprintListen from '../../utils/img/listen-sprint.svg';
import imgRememberTranslation from '../../utils/img/remember-translation.svg';
import imgWriteTranslation from '../../utils/img/write-translation.svg';
import imgListenAndGuess from '../../utils/img/listen-and-guess.svg';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {resetWordIndexAC} from "../../state/user-reducer";

export const Games = () => {
    const dispatch = useDispatch()
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    console.log(wordIndex)

    useEffect(() => {
        if (wordIndex > 0) {
            dispatch(resetWordIndexAC())
        }
    },[])

    const GAMES = [
        {
            img: imgWriteTranslation,
            path: 'write-it',
            name: 'Write the translation',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgCheckCorrect,
            path: 'check-it',
            name: 'Check correct word',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgPutTranslation,
            path: 'put-it',
            name: 'Put together a translation',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgSprintGuess,
            path: 'sprint-it',
            name: 'Sprint by guessing',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgSpeakAndCheck,
            path: 'speak-check-it',
            name: 'Speak and check ',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgListenAndGuess,
            path: 'listen-it',
            name: 'Guess and listen',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgSelectTranslation,
            path: 'select-it',
            name: 'Select the right translation',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgRememberTranslation,
            path: 'remember-it',
            name: 'Remember translation',
            description: 'Say the word on the screen and check your spelling'
        },
        {
            img: imgSprintListen,
            path: 'sprint-listen-it',
            name: 'Sprint by listen',
            description: 'Say the word on the screen and check your spelling'
        },
    ]

    return (
        <section className={styles.gameContainer}>
            {
                GAMES.map((game, index) => {
                    return (<NavLink key={index} to={'game/' + game.path}>
                            <div className={styles.gameBlock}>
                                <div>
                                    <h2>{game.name}</h2>
                                    <p>{game.description}</p>
                                </div>
                                <img src={game.img} alt=""/>
                            </div>
                        </NavLink>
                    )
                })
            }
        </section>
    )
};