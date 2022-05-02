import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import {Header} from "./components/header/header";
import {Dashboard} from "./components/dashboard/dashboard";
import {Route, Routes} from "react-router-dom";

import {Library} from "./components/library/library";
import {Learn} from "./components/learn/learn";
import {Games} from "./components/games/games";
import {useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {initialStateType} from "./state/library_reducer";
import {useCookies} from "react-cookie";
import games from './utils/index'
import {NavGames} from "./components/games/navGames";

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
    let [cookie, setCookie] = useCookies(['points']);
    const [points, setPoints] = useState(+cookie.points || 0)

    useEffect(() => {
        if (correctWords) {
            setPoints(points + 1)
            setCookie('points', points + 1)
        }
    }, [correctWords])

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
            <>
                <Routes>
                    <Route path={'/'} element={<Dashboard points={points}/>}/>
                    <Route path={PATH.HOME} element={<Dashboard points={points}/>}/>
                    <Route path={PATH.LIBRARY} element={<Library/>}/>
                    <Route path={PATH.LEARN}
                           element={<Learn wordIndex={wordIndex} setWordIndex={setWordIndex}/>}/>
                    <Route path={PATH.GAMES} element={<Games/>}/>
                    {
                        games.map((game, i) => <Route path={game.path} element={
                            <>
                                <NavGames
                                    errorWords={errorWords}
                                    correctWords={correctWords}
                                    points={points}
                                    wordIndex={wordIndex}
                                />
                                <section className={styles.gameContainer}>
                                    <game.element
                                        nextWord={nextWord}
                                        correctWords={correctWords}
                                        setCorrectWords={setCorrectWords}
                                        setErrorWords={setErrorWords}
                                        errorWords={errorWords}
                                        playWords={playWords}
                                        wordIndex={wordIndex} setWordIndex={setWordIndex}/>
                                </section>
                            </>
                        }/>)
                    }
                </Routes>
            </>
        </>
    );
}

export default App;
