import React from 'react'
import {Routes, Route} from "react-router-dom";
import {Library} from "../Library/Library";
import {LearnWords} from "../LearnWords/LearnWords";
import {HomePage} from "../HomePage/HomePage";

export const PATH = {
    HOME: '/',
    LIBRARY: '/library',
    LEARN: '/learn',
}

export const RoutesComponent = () => {

    return (
        <div>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={PATH.LIBRARY} element={<Library/>}/>
                <Route path={PATH.LEARN} element={<LearnWords/>}/>
            </Routes>
        </div>
    )
};