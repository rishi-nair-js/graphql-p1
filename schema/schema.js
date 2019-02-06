const { GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt } = require('graphql')
const axios = require('axios')


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        name: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/books/${args.id}`).then(res => res.data)
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/books`).then(res => res.data)
            },
            authors: {
                type: GraphQLList(AuthorType),
                resolve(parent, args) {
                    return null
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})