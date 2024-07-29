const express = require('express');
const path = require('path'); // Add path module to work with file paths
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);


const {response} = require("express");

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.json());
app.post( "/login", (req,res) => {

    res.send('<h1>Login Page</h1><p>Welcome to the login page!</p>');
});

app.post( "/register", async (req, res) => {
    try {
        const username1 = req.body.username;
        const email1 = req.body.email;
        const password1 = req.body.password1
        // Log received data
        console.log('Received data:', {username1, email1, password1});

        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('BiootStorage');
        const collection = database.collection('Users');

        const user = {username: username1, email: email1, password: password1};
        //insert
        const insertedUser = await collection.insertOne(user);
        console.log(`User inserted with _id: ${insertedUser.insertedId}`);


        res.send("success");
    } catch (error) {
        console.error('Error processing POST request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});