import { useEffect } from "react"
import { useDispatch } from "react-redux"

import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from './components/VisibilityFilter'

import noteService from './services/notes'
import { initializeNotes } from "./reducers/noteReducer"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeNotes())
    }, [])

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    )
}

// Every input has the same name attribute --> They form a button group, only one can be selected

export default App