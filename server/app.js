const express = require('express');
const {MongoClient} = require('mongodb');
const indexRouter = require("./routes");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');


require('dotenv').config();


async function main() {
    const port = process.env.PORT;
    const uri = process.env.MONGO_URI;

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



    app.use(cors({origin: true, credentials: true}));
    app.use(bodyParser.json({limit: "400mb"}));
    app.use(bodyParser.urlencoded({limit: "400mb", extended: true}));
    app.use(
        mongoSanitize({
            replaceWith: '_',
        }),
    );
    app.use(express.static(path.join(__dirname, 'public')));

    app.use("/", indexRouter);



    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}



main().catch(console.error);