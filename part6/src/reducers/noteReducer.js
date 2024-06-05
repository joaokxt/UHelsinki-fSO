import { createSlice, current } from "@reduxjs/toolkit"
import noteService from '../services/notes'

/*
const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case('NEW_NOTE'):
            return [...state, action.payload]
                // Reducers must be pure functions !!
                // The reducer shall not mutate the state directly !!
        case('TOGGLE_IMPORTANCE'):
            const id = action.payload.id
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => note.id !== id ? note : changedNote)
        default:
            return state
    } 
}
*/

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => 
                note.id !== id ? note : changedNote
            )
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    },
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

// The following are now equivalent
// dispatch(createNote('Redux Toolkit is awesome!'))
// dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!'})

// Action creators
// Redux Thunk (comes when configureStore) allows to create action creators that return functions
// The func receives dispatch and getState as parameters

export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll
        dispatch(setNotes(notes))
    }
}

export const createNote = content => {
    return async dispatch => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

export default noteSlice.reducer