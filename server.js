const express = require('express')
const expressGQL = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')



mongoose.connect('mongodb://testmonk:monk007@ds223605.mlab.com:23605/monkgraphql', { useNewUrlParser: true })
    .then(console.log('Mongodb is connected '))
    .catch('Unable to connect')
const app = express()

app.use('/graphql', expressGQL({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('Server started on 5000');
});