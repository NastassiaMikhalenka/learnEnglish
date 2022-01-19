import React from 'react';
import {initialStateType} from "../../state/library_reducer";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";


export const LearnWords = () => {
    let library = useSelector<rootReducerType, initialStateType>(state => state.library);

    const speak = (word: string) => {
        const speakInstance = new SpeechSynthesisUtterance(word);
        speakInstance.voice = speechSynthesis.getVoices()[33];
        speechSynthesis.speak(speakInstance);
    };

    return (
        <section style={{textAlign: 'center', backgroundColor: 'chocolate'}}>
            {library.map((item, index) => (
                <ul key={index}>
                    <li>{item.word}</li>
                    <li>{item.translate}</li>
                    <div>
                        <button onClick={() => speak(library[index].translate)}>translate</button>
                    </div>
                </ul>
            ))}
        </section>
    )
};