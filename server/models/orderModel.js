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
    }
});


const orderSchema = new Schema({
    userId:{
        type:String,
        required:true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: {
        type: [itemSchema],
        required: true,
        trim: true
    }

});



const order = mongoose.model('Order', orderSchema);

module.exports = order;