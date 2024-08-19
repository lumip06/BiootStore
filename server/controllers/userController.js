const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Retrieve All Users (GET /users)
exports.userList = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve a Single User by id (GET /users/)
exports.userGetOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Extracting ID from the request parameters

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Return the found book
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Retrieve a Single User by username (GET /users/)
//LOGIN
exports.userGetLogin = asyncHandler(async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User not found!');

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password!');

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token,user }); // Return the found user
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a New User (POST /users)
exports.userCreatePost = asyncHandler(async (req, res, next) => {
    const { username, email, password1,password2 } = req.body;
    // Generate salt and hash password
    if(password1!=password2)
    {
        throw new Error("Passwords do not match");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    // Create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        // Save user to the database

        const savedUser = await newUser.save();

        // Generate a JWT token using savedUser's details
        const token = jwt.sign(
            { userId: savedUser._id }, // Corrected to use savedUser
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token along with the user data
        res.status(201).json({ user: savedUser, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// Delete a User by ID (DELETE /users/)
exports.userDelete = asyncHandler(async (req, res, next) => {
    const  id  = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();

        res.status(200).json({message:'User deleted'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});