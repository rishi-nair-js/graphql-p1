const { Schema, model } = require('mongoose')

const Book = new Schema({
    title: String,
    authorID: String,
    genre: String

})

module.exports = new model('Book', Book)