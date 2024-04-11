const mongoose = require('mongoose') // Library. Could be described as ODM. Easy to save JS objects as Mongo documents

if(process.argv.length < 3){
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://joaokxterck:${password}@nodecluster.h4exqvk.mongodb.net/noteApp?retryWrites=true&w=majority&appName=nodeCluster`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
}) // Mongo is actually schemaless, the DB doesn't care about structure of data
   // Mongoose gives schemas to data at the level of the app

const Note = mongoose.model('Note', noteSchema)
    // This model is the constructor funciotn for Note JS objects 

/*
const note = new Note({
    content: 'Mongoose makes things easy',
    important: false,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})
*/

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})