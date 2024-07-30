const express = require('express');
const {MongoClient} = require('mongodb');

//routers
const indexRouter = require("../BiootStore/routes/index");
const catalogRouter = require("../BiootStore/routes/catalog"); // Import routes for "catalog" area of site



const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const path = require('path');

const bookController = require("./controllers/bookController");
const userController = require("./controllers/userController"); // Add path module to work with file paths




async function main() {
    const port = 3000;
    const uri = "mongodb://localhost:27017/";
    //controller modules
    const bookController = require("../BiootStore/controllers/bookController");
    const userController=require("../BiootStore/controllers/userController");


    mongoose.connect(uri)
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.error("Connection failed", err);
        });

    const app = express();
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));


//adding middleware libraries
    app.use(cors({origin: true, credentials: true}));
    app.use(bodyParser.json({limit: "400mb"}));
    app.use(bodyParser.urlencoded({limit: "400mb", extended: true}));


// Serve static files from the "public" directory
    app.use(express.static(path.join(__dirname, 'public')));

    app.use("/", indexRouter);
    // app.use("/users", usersRouter);
    app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.
    // User routes
    app.get("/users", userController.user_list);//get all users
    app.get('/users/:id', userController.user_get_one);//get one
    app.get('/users/username/:username', userController.user_get_username);//get one by username
    app.post('/users', userController.user_create_post);//create
    app.delete('/users/:id', userController.user_delete);//delete one

    // Book routes
    app.get('/books', bookController.book_list);//get all
    app.get('/books/:id', bookController.book_get_one);//get one
    app.post('/books', bookController.book_create_post);//create
    app.delete('/books/:id', bookController.book_delete);//delete one

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}



main().catch(console.error);