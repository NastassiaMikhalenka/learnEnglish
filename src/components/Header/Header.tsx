import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "./Routes";


export const Header = () => {

    return (
        <header>
            <nav>
                <NavLink to={PATH.HOME}>HOME</NavLink>
                <NavLink to={PATH.LIBRARY}>LIBRARY</NavLink>
                <NavLink to={PATH.LEARN}>LEARN</NavLink>
            </nav>
        </header>
    )
};
