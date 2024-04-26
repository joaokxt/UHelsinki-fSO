const config = require('./utils/config')
const express = require('express')

const app = express()
require('express-async-errors') // Allows to error handle async functions without try/catch


const cors = require('cors') // Necessary to comply with Same origin policy. Uses CORS mechanism (Cross Origin Resource Sharing)

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connection to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.static('dist')) // Allows express to show static content in '/dist'
app.use(express.json()) // JSON parser

app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter) // Takes router from controller 
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app

