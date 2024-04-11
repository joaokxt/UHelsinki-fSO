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

app.use(express.json())
app.use(cors())
app.use(express.static('dist')) // Allows express to show static content in '/dist'

// Middleware
const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

const mongoose = require('mongoose')
const password = process.argv[2]
const url = 

mongoose.set('strictQuery', false)
mongoose.connect(url)

const Note = require('./models/note')

// Define 2 routes to the application
// Event handlers to handle HTTP GET requests

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note) {
       response.json(note) 
    } else {
        response.status(404).end()
    }
    
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

app.delete('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) // This binds the server to listen to the defined port