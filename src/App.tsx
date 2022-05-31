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
import {resetWordIndexAC, wordIndexAC} from "./state/user-reducer";

export const PATH = {
    HOME: '/dashboard',
    LIBRARY: '/library',
    LEARN: '/learn',
    GAMES: '/games',
}

function App() {
    const dispatch = useDispatch()
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)
    let wordIndex = useSelector<rootReducerType, number>(state => state.usersInfo.wordIndex)
    let points = useSelector<rootReducerType, number>(state => state.usersInfo.points)
    const [playWords, setPlayWords] = useState(library)
    // const [cookie, setCookie] = useCookies(['points']);
    // const [points, setPoints] = useState(+cookie.points || 0)



    useEffect(() => {
        setPlayWords(library.sort(() => Math.random() - 0.5).slice(0, 10))
    }, [library])

    const nextWord = () => {
        if (wordIndex !== playWords.length - 1) {
            dispatch(wordIndexAC(wordIndex))
        } else {
            alert('Game is over');
            dispatch(resetWordIndexAC())
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
                           element={<Learn/>}/>
                    <Route path={PATH.GAMES} element={<Games/>}/>
                    {
                        games.map((game, i) => <Route path={game.path} key={i} element={
                            <>
                                <NavGames/>
                                <section className={styles.gameContainer}>
                                    <game.element
                                        nextWord={nextWord}
                                        playWords={playWords}
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
