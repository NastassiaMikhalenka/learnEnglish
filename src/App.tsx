import React from 'react';
import './App.css';
import {Library} from "./components/Library/Library";
import {LearnWords} from "./components/LearnWords/LearnWords";
import {Header} from "./components/Header/Header";
import {RoutesComponent} from "./components/Header/Routes";

function App() {
    return (
        <div className="App">
            <Header/>
            <RoutesComponent/>
        </div>
    );
}

export default App;
