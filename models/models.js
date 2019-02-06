const { Schema, model } = require('mongoose')

const Book = new Schema({
    id: Number,
    title: String,
    author: String,

})

module.exports = new model('Book', Book)