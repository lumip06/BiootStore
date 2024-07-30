const express = require('express');
const router = express.Router()

//controller modules
const book_controller = require("../controllers/bookController");
const user_controller=require("../controllers/userController");


//USER ROUTES
// GET request for list of all user items.
router.get("/users", user_controller.user_list);

// GET request for one user.
router.get("/users/:id", user_controller.user_get_one);

// GET request for one user by username
router.get("/users/username/:username",user_controller.user_get_username);

// POST request for creating user.
router.post("/users",user_controller.user_create_post);

// DELETE request to delete Book.
router.delete("/users/:id", user_controller.user_delete);




//BOOK ROUTES

// GET request for list of all Book items.
router.get("/books", book_controller.book_list);

// GET request for one Book.
router.get("/books/:id", book_controller.book_get_one);

// POST request for creating Book.
router.post("/books", book_controller.book_create_post);

// DELETE request to delete Book.
router.delete("/books/:id", book_controller.book_delete);




module.exports = router