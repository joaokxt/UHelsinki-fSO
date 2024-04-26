const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const helper = require('./test_helper')

// npm test -- --test-only
// npm test -- tests/note_api.test.js
// npm test -- --test-name-pattern="the first note is about HTTP methods"

// The app isn't listening to any port when running this test (That's defined in index.js)
// It automatically bounds to an ephemeral port. No need to keep track

const api = supertest(app)


describe('when there is initially some notes saved', () => {
    // This runs before the tests and sets our DB up
    beforeEach(async () => {
        // Clean DB
        await Note.deleteMany({})
        console.log('cleared')

        // await inside forEach loop => beforeEach doesn't wait for it (another scope)
        /*helper.initialNotes.forEach(async (note) => {
            let noteObject = new Note(note)
            await noteObject.save()
            console.log('saved')
        })*/

        const noteObjects = helper.initialNotes
            .map(note => new Note(note))
        const promiseArray = noteObjects.map(note => note.save())
        await Promise.all(promiseArray) // Array of promises into single promise

        console.log('done')
    })

    test('notes are returned as json', async () => {
        console.log('entered test')
        // Our test makes an HTTP GET request to the api/notes url and verifies that the request is responded to with the status code 200. 
        // The test also verifies that the Content-Type header is set to application/json, indicating that the data is in the desired format.
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
    
        // Instead of using .expect(), the code gets here only after getting a response
    
        assert.strictEqual(response.body.length, helper.initialNotes.length)
    })
    
    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')
    
        const contents = response.body.map(e => e.content)
        assert(contents.includes('HTML is easy'))
    })
})

describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToView = notesAtStart[0]
    
        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonExistingId = await helper.nonExistingId()

        await api
            .get(`/api/notes/${validNonExistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new note', () => {
    test('a valid note can be added', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        // Check if note is in fact added
        const notesAtEnd = await helper.notesInDb()
        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
    
        const contents = notesAtEnd.map(n => n.content)
        assert(contents.includes('async/await simplifies making async calls'))
    })
    
    test('note without content is not added', async () => {
        const newNote = {
            important: true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
    
        const notesAtEnd = await helper.notesInDb()
        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
    
})

describe('deletion of a note', () => {
    test('a note can be deleted', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()

        const contents = notesAtEnd.map(r => r.content)
        assert(!contents.includes(noteToDelete.content))

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })
})

// Close DB after test
after(async () => {
    await mongoose.connection.close()
})