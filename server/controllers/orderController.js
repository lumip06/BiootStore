const asyncHandler = require("express-async-handler");
var qs = require('qs');
const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const jwt = require('jsonwebtoken');
const Book =require('../models/bookModel')
const {updateBookStock} = require("./bookController");


// Display list of all orders.
exports.orderList = asyncHandler(async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET one order
exports.orderGetOne = asyncHandler(async (req, res, next) => {
    const {id} = req.params; // Extracting ID from the request parameters

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.json(order); // Return the found book
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
exports.orderListByUser = asyncHandler(async (req, res, next) => {

    console.log("Incoming Request:", req.method, req.url);
    console.log("Request Headers:", req.headers);

    const { userId } = req.params;
    console.log(userId);

    try {
        const orders = await Order.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.json(orders); // Return the found orders
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// Handle order create on POST.
exports.orderCreatePost = asyncHandler(async (req, res, next) => {

    try {

        const {userId, date, items} = req.body;
        console.log("USER :", req.body);
        console.log("data :",date);
        console.log("items :", items);

        if (!userId) {
            console.log("User ID is required")
            return res.status(400).send({ message: "User ID is required" });
        }


        if (!Array.isArray(items)) {
            console.log("Request body must contain an array of items")
            return res.status(400).send({ message: "Request body must contain an array of items" });
        }

        const orders = items.map(item => {
            const { bookId, quantity, price } = item;
            if (!bookId || !quantity || !price) {
                throw new Error("All fields (bookId, quantity, price) are required for each item");
                // return res.status(400).send({ message:"All fields (bookId, quantity, price) are required for each item"});
            }


            if (quantity < 1) {
                throw new Error("Quantity must be at least 1");
                // return res.status(400).send({ message:"Quantity must be at least 1"});
            }

            if (price < 1) {
                throw new Error("Price must be at least 1");
                // return res.status(400).send({ message:"Price must be at least 1"});
            }

            return { bookId, quantity, price };
        });


        const newOrder = new Order({ userId, date, items: orders });


        const savedOrder = await newOrder.save();

        //ORDER WAS SAVED,UPDATE BOOKS IN DB

        await updateBookStock(req,res,next);


        res.status(201).send(savedOrder);
    } catch (error) {
        res.status(400).send({message: error.message});
    }

});