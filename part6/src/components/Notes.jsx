import { useDispatch, useSelector } from "react-redux"
    // useDispatch() hook allows any React component to acess to the dispatch function of the Redux store defined in main
    // useSelector() allows the component to access the state of the store
import { toggleImportanceOf } from "../reducers/noteReducer"


    // presentational component -> not aware that it dispatches an action
const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? ' [Important]' : '' }</strong>
        </li>
    )
}

    // container component
const Notes = () => {
    const dispatch = useDispatch
    const notes = useSelector((state) => {
        return state
    })

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => dispatch(toggleImportanceOf(note.id))} 
                />
            )}
        </ul>
    )
}

export default Notes