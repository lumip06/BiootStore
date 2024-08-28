const mongoose = require('mongoose');
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
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    }
});

bookSchema.methods.joiValidate = function (obj) {
    const Joi = require('joi');

    const schema = Joi.object({
        title: Joi.string().min(2).max(50).required(),
        author: Joi.string().min(1).max(50).required(),
        genre: Joi.string().min(1).max(50).required(),
        publisher: Joi.string().min(1).max(50).required(),
        cover: Joi.string().valid('Softcover', 'Hardcover').required(),
        stock: Joi.number().integer().min(0).required(),
        price: Joi.number().min(1).required(),
        publishedYear: Joi.number().integer().min(1800).max(2030).required()
    });

    return schema.validate(obj);
}
const book = mongoose.model('Book', bookSchema);

module.exports = book;