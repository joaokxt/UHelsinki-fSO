const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

// npm test -- --test-only
// npm test -- tests/note_api.test.js
// npm test -- --test-name-pattern="the first note is about HTTP methods"

// The app isn't listening to any port when running this test (That's defined in index.js)
// It automatically bounds to an ephemeral port. No need to keep track

const api = supertest(app)

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    },
]

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

test.only('notes are returned as json', async () => {
    // Our test makes an HTTP GET request to the api/notes url and verifies that the request is responded to with the status code 200. 
    // The test also verifies that the Content-Type header is set to application/json, indicating that the data is in the desired format.
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('there are two notes', async () => {
    const response = await api.get('/api/notes')

    // Instead of using .expect(), the code gets here only after getting a response

    assert.strictEqual(response.body.length, initialNotes.length)
})

test.only('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
})

// Close DB after test
after(async () => {
    await mongoose.connection.close()
})