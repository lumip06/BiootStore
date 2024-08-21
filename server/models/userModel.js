const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a Book
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role:{
        type:String,
        enum:['admin','client'],
        required: true
    }
});


// Create a model from the schema
const user = mongoose.model('User', userSchema);

module.exports = user;