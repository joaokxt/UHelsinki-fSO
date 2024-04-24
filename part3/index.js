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
