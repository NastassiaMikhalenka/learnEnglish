import React, {useState} from 'react';
import styles from './library.module.css';
import btn from '../../utils/img/add.svg';
import deleteBtn from '../../utils/img/delete.svg';
import {useDispatch, useSelector} from "react-redux";
import {addNewWordAC, deleteWordAC, initialStateType} from "../../state/library_reducer";
import {rootReducerType} from "../../state/store";
// import {useDispatch, useSelector} from "react-redux";
// import {rootReducerType} from "../../state/store";
// import {deleteWordAC, initialStateType, addNewWordAC} from "../../state/library_reducer";

type PropsType = {
    // library: Array<any>
    // setLibrary: any
}

export const Library = (props: PropsType) => {
    let library = useSelector<rootReducerType, initialStateType>(state => state.library)
    let dispatch = useDispatch()
    const [value, setValue] = useState<string>("")
    const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    const deleteWord = (id: number) => {
        dispatch(deleteWordAC(id))
    }

    const addNewWord = async () => {
        const response = await fetch(`http://tmp.myitschool.org/API/translate/?source=ru&target=en&word=${value}`)
        const translation = await response.json()
        // console.log(translation.translate)
        dispatch(addNewWordAC(translation.word, translation.translate));
        setValue('')
    }

    // const addNewWord = async (e: any) => {
    //     e.preventDefault()
    //     const response = await fetch(`http://tmp.myitschool.org/API/translate/?source=ru&target=en&word=${value}`)
    //     const translation = await response.json()
    //     // console.log(translation.translate)
    //     const updateLibrary = [...props.library,
    //         {word: translation.word, translate: translation.translate, learn: 0}]
    //     props.setLibrary(updateLibrary)
    //     setValue('')
    //     localStorage.setItem('library', JSON.stringify(updateLibrary))
    //     // dispatch(addNewWordAC(translation.word, translation.translate));
    // }

    // const deleteWord = (id: number) => {
    //     const updateLibrary = props.library.filter((word, index) => index !== id)
    //     props.setLibrary(updateLibrary)
    //     localStorage.setItem('library', JSON.stringify(updateLibrary))
    // }

    return (
        <section className={styles.libraryBlock}>
            <span>Add new <b>Word</b></span>
            <form onSubmit={addNewWord} className={styles.addWordBlock}>
                <input type={"text"} value={value} onChange={onTextChanged}/>
                <button>
                    <img src={btn} alt={""}/>
                </button>
            </form>
            <div className={styles.wordsTable}>
                <ul>
                    <li><h3>Word</h3></li>
                    <li><h3>Translation</h3></li>
                    <li><h3>Learn</h3></li>
                </ul>
                {library.map((item, index) => (
                    <ul key={index}>
                        <li>{item.word}</li>
                        <li>{item.translate}</li>
                        <li>{item.learn}</li>
                        <div className={styles.settings}>
                            <button onClick={() => deleteWord(index)}>
                                <img src={deleteBtn} alt={""}/>
                            </button>
                        </div>
                    </ul>
                ))}
            </div>
        </section>
    )
}

