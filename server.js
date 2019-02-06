const express = require('express')
const expressGQL = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', expressGQL({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('Server started on 5000');
});