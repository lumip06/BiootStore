const express = require("express");
const router = express.Router();


//controller modules
const bookController = require("../controllers/bookController");
const userController=require("../controllers/userController");
const orderController=require("../controllers/orderController");
const wishlistController=require("../controllers/wishlistController");
const {validateToken} = require("../middleware/ValidateToken");
const {validateUser}=require("../middleware/ValidateUser");
const {validateBook}=require("../middleware/ValidateBook");
const {validateOrder}=require("../middleware/ValidateOrder");

//USER ROUTES
// GET request for list of all user items.
router.get("/users", userController.userList);

// GET request for one user.
router.get("/users/:id", userController.userGetOne);

// GET request for one user by username
router.post("/users/login",userController.userGetLogin);

// POST request for creating user.
router.post("/users",validateUser,userController.userCreatePost);

// DELETE request to delete Book.
router.delete("/users/:id", userController.userDelete);




//BOOK ROUTES

// GET request for list of all Book items.
router.get("/books", bookController.bookList);


//GET books by title and author (search)
router.get("/books/search",bookController.bookSearch);

router.put("/books", bookController.updateBookStock);

// GET request for book properties
router.get("/books/properties", bookController.getBookProperties);
// GET request for book infos by ids
router.post("/books/infos/", bookController.bookGetInfosByIds);

// GET request for one Book.
router.get("/books/:id", bookController.bookGetOne);

// POST request for creating Book.
router.post("/books", validateBook,bookController.bookCreatePost);

// DELETE request to delete Book.
router.delete("/books/:id", bookController.bookDelete);


//ORDER ROUTES

//get all orders for one user
// OR GET request for list of all order items.
router.get("/orders", validateToken,orderController.orderList);


// GET request for one order
router.get("/orders/:id", orderController.orderGetOne);

// POST request for creating order.
router.post("/orders", validateToken,validateOrder,orderController.orderCreatePost);


//WISHLIST ROUTES

//GET all wishlists for admin ,for client get client's wishlist
router.get("/wishlists",validateToken,wishlistController.wishlistList);

//CREATE wishlist ,if wishlist exists,update
router.post("/wishlists",validateToken,wishlistController.wishlistCreatePost);

//DELETE FROM WISHLIST
router.delete("/wishlists",validateToken,wishlistController.wishlistDeleteItems);

module.exports = router