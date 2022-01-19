import React from 'react';
import './App.css';
import {Library} from "./components/Library/Library";
import {LearnWords} from "./components/LearnWords/LearnWords";

function App() {
    return (
        <div className="App">
            <Library/>
            <LearnWords/>
        </div>
    );
}

export default App;
