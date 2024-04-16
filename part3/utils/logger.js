
// File dedicated to console logs. 
// If we wanted to start logging in a file or send to ext. service
// This is simpler

const info = (...params) => {
    console.log(...params)
} // Normal log messages

const error = (...params) => {
    console.error(...params)
} // Error messages

module.exports = {
    info, error
}