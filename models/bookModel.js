const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a Book
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    cover: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const book = mongoose.model('Book', bookSchema);

module.exports = book;