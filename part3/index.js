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


Using Express library:
*/

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

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



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoints
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// Handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) // This binds the server to listen to the defined port