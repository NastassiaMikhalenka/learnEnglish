import React from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import styles from './nav.module.css'

export const PATH = {
    HOME: '/dashboard',
    LIBRARY: '/library',
    LEARN: '/learn',
    GAMES: '/games',
    POPULAR: '/games/game/check-it',
}

export const Nav = () => {
    return (
        <nav className={styles.nav}>
            <NavLink to={PATH.HOME}>HOME</NavLink>
            <NavLink to={PATH.GAMES}>GAMES</NavLink>
            <NavLink to={PATH.LIBRARY}>LIBRARY</NavLink>
            <NavLink to={PATH.LEARN}>LEARN</NavLink>
        </nav>
    )
}