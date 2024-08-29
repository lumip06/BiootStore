const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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


userSchema.methods.joiValidate = function(obj) {
    const Joi = require('joi');

    const schema = Joi.object({
        username: Joi.string().min(6).max(30).required(),
        password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid('admin', 'client').required()
    });

    return schema.validate(obj);
}

const user = mongoose.model('User', userSchema);

module.exports = user;