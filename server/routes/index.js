const express = require("express");
const router = express.Router();


//controller modules
const bookController = require("../controllers/bookController");
const userController=require("../controllers/userController");


//USER ROUTES
// GET request for list of all user items.
router.get("/users", userController.userList);

// GET request for one user.
router.get("/users/:id", userController.userGetOne);

// GET request for one user by username
router.get("/users/username/:username",userController.userGetUsername);

// POST request for creating user.
router.post("/users",userController.userCreatePost);

// DELETE request to delete Book.
router.delete("/users/:id", userController.userDelete);




//BOOK ROUTES

// GET request for list of all Book items.
router.get("/books", bookController.bookList);


//GET books by title and author (search)
router.get("/books/search",bookController.bookSearch);

// GET request for book properties
router.get("/books/properties", bookController.getBookProperties);
// GET request for book infos by ids
router.get("/books/infos/", bookController.bookGetInfosByIds);

// GET request for one Book.
router.get("/books/:id", bookController.bookGetOne);

// POST request for creating Book.
router.post("/books", bookController.bookCreatePost);

// DELETE request to delete Book.
router.delete("/books/:id", bookController.bookDelete);



module.exports = router