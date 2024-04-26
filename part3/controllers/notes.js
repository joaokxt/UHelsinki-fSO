// Router object: instance of middleware and routes. Can be used for defining related routes in a single place

const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// Define 2 routes to the application
// Event handlers to handle HTTP GET requests

// Change to promise handling: .then().catch() --> async/await functions (ES7!!)

notesRouter.get('/', async (request, response) => {
    const notes = await Note
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {

    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

    /*Note.findById(request.params.id)
        .then(note => {
            if(note) {
               response.json(note) 
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    */
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user.id
    })

    // With async/await it is recommended to handle errors with try/catch

    const savedNote = await note.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)

})

notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body

    // findByIdAndUpdate() does not run schema validations by default
    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {

    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

module.exports = notesRouter