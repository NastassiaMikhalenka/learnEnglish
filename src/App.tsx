import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import {Header} from "./components/header/header";
import {Dashboard} from "./components/dashboard/dashboard";
import {NavLink, Route, Routes} from "react-router-dom";

import {Library} from "./components/library/library";
import {Learn} from "./components/learn/learn";
import {Games} from "./components/games/games";
import {WriteIt} from "./components/games/appGames/writeIt";
import {CheckIt} from "./components/games/appGames/checkIt";
import {useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {initialStateType} from "./state/library_reducer";
import {PutIt} from "./components/games/appGames/putIt";

export const PATH = {
    HOME: '/dashboard',
    LIBRARY: '/library',
    LEARN: '/learn',
    GAMES: '/games',
}

function App() {
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)
    const [wordIndex, setWordIndex] = useState(0)
    const [playWords, setPlayWords] = useState(library.slice(-10))
    const [correctWords, setCorrectWords] = useState(0)
    const [errorWords, setErrorWords] = useState(0)
    const [points, setPoints] = useState(0)

    useEffect(() => {
        setPoints(points + correctWords)
    }, [correctWords])

    const progressBarWidth = {
        width: `${(100 / library.slice(-10).length) * (wordIndex + 1)}vw`
    };

    const speak = (word: string) => {
        const speakInstance = new SpeechSynthesisUtterance(word);
        speakInstance.voice = speechSynthesis.getVoices()[51];
        speechSynthesis.speak(speakInstance);
    };

    const nextWord = () => {
        if (wordIndex !== playWords.length - 1) {
            setWordIndex(wordIndex + 1);
        } else {
            alert('Game is over');
            setWordIndex(0);
        }
    };

    return (
        <>
            <Header/>
            <div>
                <Routes>
                    <Route path={PATH.HOME} element={<Dashboard/>}/>
                    <Route path={PATH.LIBRARY} element={<Library/>}/>
                    <Route path={PATH.LEARN} element={ <Learn wordIndex={wordIndex} setWordIndex={setWordIndex} speak={speak}/>}/>
                    <Route path={PATH.GAMES} element={<Games/>}/>
                    {/*//Game*/}
                    <Route path={'games/game/write-it'} element={
                        <>
                            <div className={styles.progressBarContainer}>
                                <div className={styles.progressBar} style={progressBarWidth}> </div>
                            </div>
                            <div>
                                <NavLink to={PATH.GAMES}> <div className={styles.btnBack}> </div> </NavLink>
                                <nav className={styles.gameNav}>
                                    <ul className={styles.results}>
                                        <li>Errors: {errorWords}</li>
                                        <li>Correct: {correctWords}</li>
                                        <li>Points: {points}</li>
                                    </ul>
                                </nav>
                            </div>
                            <section className={styles.gameContainer}>
                                <WriteIt
                                    speak={speak}
                                    correctWords={correctWords}
                                    setCorrectWords={setCorrectWords}
                                    setErrorWords={setErrorWords}
                                    errorWords={errorWords}
                                    playWords={playWords}
                                    wordIndex={wordIndex} setWordIndex={setWordIndex}/>
                            </section>
                        </>
                    }/>
                    {/*//Game*/}
                    <Route path={'games/game/check-it'} element={
                        <>
                            <div className={styles.progressBarContainer}>
                                <div className={styles.progressBar} style={progressBarWidth}> </div>
                            </div>
                            <div>
                                <NavLink to={PATH.GAMES}> <div className={styles.btnBack}> </div></NavLink>
                                <nav className={styles.gameNav}>
                                    <ul className={styles.results}>
                                        <li>Errors: {errorWords}</li>
                                        <li>Correct: {correctWords}</li>
                                        <li>Points: {points}</li>
                                    </ul>
                                </nav>
                            </div>
                            <section className={styles.gameContainer}>
                                <CheckIt
                                    speak={speak}
                                    correctWords={correctWords}
                                    setCorrectWords={setCorrectWords}
                                    setErrorWords={setErrorWords}
                                    errorWords={errorWords}
                                    playWords={playWords}
                                    wordIndex={wordIndex} setWordIndex={setWordIndex}
                                />
                            </section>
                        </>
                    }/>
                    {/*// Game*/}
                    <Route path={'games/game/put-it'} element={
                        <>
                            <div className={styles.progressBarContainer}>
                                <div className={styles.progressBar} style={progressBarWidth}> </div>
                            </div>
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
                            <section className={styles.gameContainer}>
                                <PutIt
                                    nextWord={nextWord}
                                    playWords={playWords}
                                    wordIndex={wordIndex}
                                    correctWords={correctWords}
                                    setCorrectWords={setCorrectWords}
                                    setErrorWords={setErrorWords}
                                    errorWords={errorWords}
                                />
                            </section>
                        </>
                    }/>
                </Routes>
            </div>
        </>
    );
}

export default App;
