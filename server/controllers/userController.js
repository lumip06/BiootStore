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
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Retrieve a Single User by username (GET /users/)
//LOGIN
exports.userGetLogin = asyncHandler(async (req, res, next) => {
    try {
        const { username, password } = req.body;


        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User not found!');


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password!');

        const token = jwt.sign({ userId: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token,user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a New User (POST /users)
exports.userCreatePost = asyncHandler(async (req, res, next) => {

    const { username, email, password1,password2,role } = req.body;

    // if(password1!==password2)
    // {
    //     throw new Error("Passwords do not match");
    // }

    // const userData = {
    //     username,
    //     email,
    //     password: password1, // Use the plain password for validation
    //     role
    // };
    //
    // // Validate the input data using Joi
    // const { error } = new User().joiValidate(userData);
    // if (error) {
    //   //  console.log(error.details[0].message)
    //      res.status(400).json({  message: error.details[0].message});
    //
    //     // throw new Error(error.details[0].message);
    // }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    try {
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role
    });



        const savedUser = await newUser.save();


        const token = jwt.sign(
            { userId: savedUser._id , role: savedUser.role},
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );


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