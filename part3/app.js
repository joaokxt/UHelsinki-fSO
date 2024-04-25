const config = require('./utils/config')
const express = require('express')

require('express-async-errors') // Allows to error handle async functions without try/catch
const app = express()

const cors = require('cors') // Necessary to comply with Same origin policy. Uses CORS mechanism (Cross Origin Resource Sharing)

const notesRouter = require('./controllers/notes')
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

app.use('/api/notes', notesRouter) // Takes router from controller 

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app

