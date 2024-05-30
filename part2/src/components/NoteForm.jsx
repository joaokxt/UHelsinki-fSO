import { useState } from 'react'

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')

    const addNote = (event) => {
        event.preventDefault() // Prevents default action of submission (like reloading)
        createNote({
            content: newNote,
            important: Math.random() < 0.5,
        })

        setNewNote('')
    }

    return (
        <div className='formDiv'>
            <h2>Create new note</h2>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={(event) => setNewNote(event.target.value)}
                    id='new-note'
                    placeholder='Write note here'
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default NoteForm