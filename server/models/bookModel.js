const mongoose = require('mongoose');
const url = require("node:url");
const Schema = mongoose.Schema;

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
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:false
    }
});


const book = mongoose.model('Book', bookSchema);

module.exports = book;