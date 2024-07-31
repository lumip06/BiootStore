const express = require('express');
const router = express.Router()

//controller modules
const book_controller = require("../controllers/bookController");
const user_controller=require("../controllers/userController");


//USER ROUTES
// GET request for list of all user items.
router.get("/users", user_controller.userList);

// GET request for one user.
router.get("/users/:id", user_controller.userGetOne);

// GET request for one user by username
router.get("/users/username/:username",user_controller.userGetUsername);

// POST request for creating user.
router.post("/users",user_controller.userCreatePost);

// DELETE request to delete Book.
router.delete("/users/:id", user_controller.userDelete);




//BOOK ROUTES

// GET request for list of all Book items.
router.get("/books", book_controller.bookList);

// GET request for one Book.
router.get("/books/:id", book_controller.bookGetOne);

// POST request for creating Book.
router.post("/books", book_controller.bookCreatePost);

// DELETE request to delete Book.
router.delete("/books/:id", book_controller.bookDelete);




module.exports = router