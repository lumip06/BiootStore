const book =require('../models/bookModel')
const asyncHandler = require("express-async-handler");

// Display list of all books.
exports.bookList = asyncHandler(async (req, res, next) => {
    try {
        const books = await book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one book
exports.bookGetOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Extracting ID from the request parameters

    try {
        const book = await book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book); // Return the found book
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Handle book create on POST.
exports.bookCreatePost = asyncHandler(async (req, res, next) => {
    const { title, author, publishedYear, genre, publisher, cover } = req.body;

    const newBook = new book({
        title,
        author,
        publishedYear,
        genre,
        publisher,
        cover
    });

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Display book delete form .
exports.bookDelete = asyncHandler(async (req, res, next) => {

    const  id  = req.params.id;

    try {
        const book = await book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.deleteOne();

        res.status(200).json({message:'Book deleted'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

