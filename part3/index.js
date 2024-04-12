/*
Node.js built-in server ==> Deprecated practice

const http = require('http') 

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

--> Creates web server
--> Event handler is registered and is called at every HTTP request
--> The request is responded with a 200 (OK) and sets the content type
--> The content of the response is defined with .end(). This func expects a string
*/

/*
Using Express library
*/

require('dotenv').config() // Allows to use .env file to save environment variables
const express = require('express') // ==> Equivalent to import
const app = express()
const cors = require('cors') // Necessary to comply with Same origin policy. Uses CORS mechanism (Cross Origin Resource Sharing)

app.use(express.static('dist')) // Allows express to show static content in '/dist'
app.use(express.json())
app.use(cors())

// Middleware
const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

const Note = require('./models/note')

// Define 2 routes to the application
// Event handlers to handle HTTP GET requests

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if(note) {
               response.json(note) 
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if(body.content === undefined){
        return response.status(400).json({
            error: "content missing"
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    // Regular JS object
    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoints
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// Handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) // This binds the server to listen to the defined port