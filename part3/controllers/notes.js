
// Router object: instance of middleware and routes. Can be used for defining related routes in a single place

const notesRouter = require('express').Router()
const Note = require('../models/note')

// Define 2 routes to the application
// Event handlers to handle HTTP GET requests

// Change to promise handling: .then().catch() --> async/await functions (ES7!!)

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {

    try {
        const note = await Note.findById(request.params.id)
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    } catch(exception) {
        next(exception)
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
    
    /* if(body.content === undefined){
        return response.status(400).json({
            error: "content missing"
        })
    }*/

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    // With async/await it is recommended to handle errors with try/catch

    try {
        const savedNote = await note.save()
        response.status(201).json(savedNote)
    } catch(exception) {
        next(exception)
    }
    
})

notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body

    // findByIdAndUpdate() does not run schema validations by default
    Note.findByIdAndUpdate(
        request.params.id,
        { content, important }, 
        { new: true, runValidators: true, context: 'query'}
    )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {
    
    try {
        await Note.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
   
    /*Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))*/
})

module.exports = notesRouter