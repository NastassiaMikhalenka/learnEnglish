import React, {useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {rootReducerType} from "../../state/store";
// import {deleteWordAC, initialStateType, addNewWordAC} from "../../state/library_reducer";
//
//
//
// export const Library = ({library}) => {
//     let library = useSelector<rootReducerType, initialStateType>(state => state.library)
//     let dispatch = useDispatch()
//     const [value, setValue] = useState<string>("")
//     const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);
//
//     const deleteWord = (id: number) => {
//         dispatch(deleteWordAC(id))
//     }
//
//     const addNewWord = async () => {
//         const response = await fetch(`http://tmp.myitschool.org/API/translate/?source=ru&target=en&word=${value}`)
//         const translation = await response.json()
//         console.log(translation.translate)
//         dispatch(addNewWordAC(translation.word, translation.translate));
//     }
//     console.log(library)
//
//
//     return (
//         <section>
//             <span>Add new <b>Word</b></span>
//             <input value={value} onChange={onTextChanged} type="text"/>
//             <button onClick={addNewWord}>
//                 ADD
//             </button>
//             <div>
//                 <ul>
//                     <li><h3>Word</h3></li>
//                     <li><h3>Translation</h3></li>
//                     <li><h3>Learn</h3></li>
//                 </ul>
//                 {library.map((item, index) => (
//                     <ul key={index}>
//                         <li>{item.word}</li>
//                         <li>{item.translate}</li>
//                         <li>{item.learn}</li>
//                         <div>
//                             <button onClick={() => deleteWord(index)}>
//                                 DELETE
//                             </button>
//                         </div>
//                     </ul>
//                 ))}
//             </div>
//         </section>
//     )
// }
//
