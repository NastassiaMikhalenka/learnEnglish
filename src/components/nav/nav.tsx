import React from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import styles from './nav.module.css'

export const PATH = {
    HOME: '/dashboard',
    LIBRARY: '/library',
    LEARN: '/learn',
    GAMES: '/games',
}

export const Nav = () => {
    return (
        <nav className={styles.nav}>
            {/*<a href={""}>HOME</a>*/}
            {/*<a href={""}>GAMES</a>*/}
            {/*<a href={""}>LIBRARY</a>*/}
            {/*<a href={""}>LEARN</a>*/}
            <NavLink to={PATH.HOME}>HOME</NavLink>
            <NavLink to={PATH.GAMES}>GAMES</NavLink>
            <NavLink to={PATH.LIBRARY}>LIBRARY</NavLink>
            <NavLink to={PATH.LEARN}>LEARN</NavLink>
        </nav>
    )
}