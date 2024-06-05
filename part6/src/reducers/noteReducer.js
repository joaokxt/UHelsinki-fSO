import { createSlice, current } from "@reduxjs/toolkit"

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]

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
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId(),
            }) // Toolkit uses Immer lib. Makes possiuble to mutate state inside the reducer
        },
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
        }
    },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer

// The following are now equivalent
// dispatch(createNote('Redux Toolkit is awesome!'))
// dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!'})