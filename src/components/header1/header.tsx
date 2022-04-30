import React from 'react';
import {ReactComponent as Logo} from '../../utils/img/Icon.svg';
import styles from './header.module.css';
import {Nav} from "../nav/nav";

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo/>
            <Nav/>
        </header>
    )
}
