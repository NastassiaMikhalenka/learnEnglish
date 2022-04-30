import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import {Header} from "./components/header1/header";
import {Dashboard} from "./components/dashboard/dashboard";
import { NavLink, Route, Routes} from "react-router-dom";
import {LearnWords} from "./components/LearnWords/LearnWords";

import {Library} from "./components/library1/library";
import {Learn} from "./components/learn/learn";
import {Games} from "./components/games/games";
import {WriteIt} from "./components/games/appGames/writeIt";
import {CheckIt} from "./components/games/appGames/checkIt";

export const PATH = {
    HOME: '/dashboard',
    LIBRARY: '/library',
    LEARN: '/learn',
    GAMES: '/games',
}

function App() {
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library') as string) || []);
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

    return (
        <>
            <Header/>
            <div>
                <Routes>
                    <Route path={PATH.HOME} element={<Dashboard/>}/>
                    <Route path={PATH.LIBRARY} element={<Library library={library} setLibrary={setLibrary}/>}/>
                    <Route path={PATH.LEARN} element={<>
                        <div className={styles.progressBarContainer}>
                            <div className={styles.progressBar} style={progressBarWidth}></div>
                        </div>
                        <Learn library={library} wordIndex={wordIndex} setWordIndex={setWordIndex} speak={speak}/>
                        <div onClick={() => {
                            if (wordIndex === library.length - 1) {
                                setWordIndex(0)
                            } else {
                                setWordIndex(wordIndex + 1)
                            }
                        }}
                             className={styles.btnNext}></div>
                    </>
                    }/>
                    <Route path={PATH.GAMES} element={<Games/>}/>
                    {/*//Game*/}
                    <Route path={'games/game/write-it'} element={
                        <>
                            <div className={styles.progressBarContainer}>
                                <div className={styles.progressBar} style={progressBarWidth}> </div>
                            </div>
                            <div >
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
                            <div >
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
                                <CheckIt
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
                </Routes>
            </div>
            {/*<RoutesComponent/>*/}
            {/*<Dashboard/>*/}
            {/*<Routes>*/}
            {/*    <Route path={PATH.HOME} element={<Dashboard/>}/>*/}
            {/*    <Route path={PATH.LIBRARY} element={<Library/>}/>*/}
            {/*    <Route path={PATH.LEARN} element={<LearnWords/>}/>*/}
            {/*</Routes>*/}
            {/*<Header/>*/}
            {/*<RoutesComponent/>*/}
        </>
    );
}

export default App;
