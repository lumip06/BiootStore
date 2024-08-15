const asyncHandler = require("express-async-handler");
var qs = require('qs');
const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const jwt = require('jsonwebtoken');



const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract the token

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Attach the decoded user data to the request object
        next(); // Call the next middleware or route handler
    });
};

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
    // Log the entire request for debugging
    console.log("Incoming Request:", req.method, req.url);
    console.log("Request Headers:", req.headers);
    const token =  (req.headers.authorization.split(' ')[1] || req.headers.Authorization.split(' ')[1]) ;
    console.log("Received token:", token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual secret key
        const { userId } = req.params;
        console.log(userId)

        if (decoded.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden: User not authorized' });
        }

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

    try {       // Extract the token from the Authorization header
        const token = (req.headers.authorization.split(' ')[1] || req.headers.Authorization.split(' ')[1]) ;

        // Verify the token
        if (!token) {
            return res.status(401).send({ message: "No token provided, authorization denied" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        } catch (err) {
            return res.status(401).send({ message: "Invalid token" });
        }
        // Ensure req.body is an object (not an array)
        const {userId, date, items} = req.body; // Expecting req.body to contain 'userId', 'date', and 'items' properties
        console.log("USER :", req.body);
        console.log("data :",date);
        console.log("items :", items);
        // Validate userId
        if (!userId) {
            return res.status(400).send({ message: "User ID is required" });
        }

        // Check if the userId from the token matches the userId in the request body
        if (decoded.userId !== userId) {
            return res.status(403).send({ message: "Forbidden: User not authorized" });
        }

        // Validate that items is an array
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

        // Create a new order instance with validated userId, date, and items
        const newOrder = new Order({ userId, date, items: orders });

        // Save the new order to the database
        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder); // Send the saved order back as a response
    } catch (error) {
        res.status(400).send({message: error.message});
    }

});