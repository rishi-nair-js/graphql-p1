const { Schema, model } = require('mongoose')

const Author = new Schema({
    name: String,
    age: Number,

})

module.exports = new model('Author', Author)