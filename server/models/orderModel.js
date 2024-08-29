const mongoose = require('mongoose');
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
        min: 1
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


orderSchema.methods.joiValidateItems = function(obj) {
    const Joi = require('joi');
    const itemSchema = Joi.object({
        bookId: Joi.string().required(),
        quantity: Joi.number().min(1).required()
    });

    return itemSchema.validate(obj);
};


orderSchema.methods.joiValidate = function(obj) {
    const Joi = require('joi');
    const schema = Joi.object({
        userId: Joi.string().required(),
        date: Joi.date().default(Date.now),
        items: Joi.array().required()
    });


    const { error } = schema.validate(obj);
    if (error) {
        return { error: error.details[0].message };
    }

    return { error: null };
};

const order = mongoose.model('Order', orderSchema);

module.exports = order;