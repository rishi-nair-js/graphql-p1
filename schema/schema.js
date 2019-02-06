const { GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt } = require('graphql')
const axios = require('axios')
const Book = require('../models/book')
const Author = require('../models/author')

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorID)
            }
        }
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
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return Book.findOne({ title: args.name })
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

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBooks: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorID: { type: GraphQLID }
            },
            resolve(parent, args) {
                let book = new Book({
                    title: args.name,
                    genre: args.genre,
                    authorID: args.authorID
                })
                return book.save()
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})