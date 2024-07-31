const user = require("../models/userModel");
const asyncHandler = require("express-async-handler");


// Retrieve All Users (GET /users)
exports.userList = asyncHandler(async (req, res, next) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve a Single User by id (GET /users/)
exports.userGetOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Extracting ID from the request parameters

    try {
        const user = await user.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Return the found book
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Retrieve a Single User by username (GET /users/)
exports.userGetUsername = asyncHandler(async (req, res, next) => {
    const { username } = req.params; // Extracting ID from the request parameters

    try {
        const user = await user.findById(username); ///DE FACUT PT USERNAME
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Return the found book
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a New User (POST /users)
exports.userCreatePost = asyncHandler(async (req, res, next) => {
    const { username ,email ,password } = req.body;

    const newUser = new user({
        username,
        email,
        password
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// Delete a User by ID (DELETE /users/)
exports.userDelete = asyncHandler(async (req, res, next) => {
    const  id  = req.params.id;

    try {
        const user = await user.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();

        res.status(200).json({message:'User deleted'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});