const express = require('express');
const {MongoClient} = require('mongodb');

//routers
const indexRouter = require("../BiootStore/routes/index");
const catalogRouter = require("../BiootStore/routes/catalog"); // Import routes for "catalog" area of site



const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const path = require('path');

// const bookController = require("./controllers/bookController");
// const userController = require("./controllers/userController"); // Add path module to work with file paths

// Load environment variables from .env file
require('dotenv').config();


async function main() {
    const port = process.env.PORT;
    const uri = process.env.MONGO_URI;
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
    app.get("/users", userController.userList);//get all users
    app.get('/users/:id', userController.userGetOne);//get one
    app.get('/users/username/:username', userController.userGetUsername);//get one by username
    app.post('/users', userController.userCreatePost);//create
    app.delete('/users/:id', userController.userDelete);//delete one

    // Book routes
    app.get('/books', bookController.bookList);//get all
    app.get('/books/:id', bookController.bookGetOne);//get one
    app.post('/books', bookController.bookCreatePost);//create
    app.delete('/books/:id', bookController.bookDelete);//delete one

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}



main().catch(console.error);