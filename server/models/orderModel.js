const mongoose = require('mongoose');
const url = require("node:url");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    bookId: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // at least 1 book
    },
    price: {
        type: Number,
        required: true,
        min: 1 // Ensures price is not negative
    }
});

// Define the schema for an Order
const orderSchema = new Schema({
    items: {
        type: [itemSchema], // Use the item schema as the type for items
        required: true,
        trim: true
    }

});


// Create a model from the schema
const order = mongoose.model('Order', orderSchema);

module.exports = order;