import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import {Header} from "./components/header/header";
import {Dashboard} from "./components/dashboard/dashboard";
import {Route, Routes} from "react-router-dom";

import {Library} from "./components/library/library";
import {Learn} from "./components/learn/learn";
import {Games} from "./components/games/games";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {initialStateType} from "./state/library_reducer";
import {useCookies} from "react-cookie";
import games from './utils/index'
import {NavGames} from "./components/games/navGames";
import {NotFound} from "./components/notFound/notFound";
import {pointsAC, resetWordIndexAC, wordIndexAC} from "./state/user-reducer";

export const PATH = {
    HOME: '/dashboard',
    LIBRARY: '/library',
    LEARN: '/learn',
    GAMES: '/games',
}

function App() {
    const dispatch = useDispatch()
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)
    let correctWords = useSelector<rootReducerType, number>(state => state.usersInfo.correctWords)
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)
    // const [wordIndex, setWordIndex] = useState(0)
    const [playWords, setPlayWords] = useState(library.slice(-10))
    // const [cookie, setCookie] = useCookies(['points']);
    // const [points, setPoints] = useState(+cookie.points || 0)

    // useEffect(() => {
    //     if (correctWords) {
    //         dispatch(pointsAC(points))
    //         // setCookie('points', points + 1)
    //     }
    // }, [correctWords])

    const nextWord = () => {
        if (wordIndex !== playWords.length - 1) {
            dispatch(wordIndexAC(wordIndex))
            // setWordIndex(wordIndex + 1);
        } else {
            alert('Game is over');
            dispatch(resetWordIndexAC())
            // setWordIndex(0);
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
                           element={<Learn
                               // wordIndex={wordIndex} setWordIndex={setWordIndex}
                           />}/>
                    <Route path={PATH.GAMES} element={<Games/>}/>
                    {
                        games.map((game, i) => <Route path={game.path} element={
                            <>
                                <NavGames
                                    // playWords={playWords}
                                    // points={points}
                                    wordIndex={wordIndex}
                                />
                                <section className={styles.gameContainer}>
                                    <game.element
                                        nextWord={nextWord}
                                        playWords={playWords}
                                        // wordIndex={wordIndex}
                                        // setWordIndex={setWordIndex}
                                    />
                                </section>
                            </>
                        }/>)
                    }
                    <Route path={"/*"} element={<NotFound/>}/>
                </Routes>
            </>
        </>
    );
}

export default App;
