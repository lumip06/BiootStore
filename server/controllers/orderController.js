
const asyncHandler = require("express-async-handler");
var qs = require('qs');
const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Book = require("../models/bookModel");

// Display list of all orders.
exports.orderList = asyncHandler(async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one order
exports.orderGetOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Extracting ID from the request parameters

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order); // Return the found book
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Handle order create on POST.
exports.orderCreatePost = asyncHandler(async (req, res, next) => {
    try {
        // Ensure req.body is an object (not an array)
        const { items } = req.body; // Expecting req.body to contain an 'items' property

        if (!Array.isArray(items)) {
            return res.status(400).send({ message: "Request body must contain an array of items" });
        }

        // Validate each item in the order
        const orders = items.map(item => {
            const { bookId, quantity, price } = item;
            if (!bookId || !quantity || !price) {
                throw new Error("All fields (bookId, quantity, price) are required for each item");
            }

            // Optional: Add any additional validation (e.g., check if quantity is a positive integer)
            if (quantity < 1) {
                throw new Error("Quantity must be at least 1");
            }

            if (price < 1) {
                throw new Error("Price must be at least 1");
            }

            return { bookId, quantity, price }; // Return a validated item object
        });

        // Create a new order instance with validated items
        const newOrder = new Order({ items: orders });

        // Save the new order to the database
        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder); // Send the saved order back as a response
    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});