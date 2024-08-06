const Book =require('../models/bookModel')
const asyncHandler = require("express-async-handler");
var qs = require('qs');




// Display list of all books.
exports.bookList = asyncHandler(async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Display list of all books sorted by criteria
exports.bookSorted = asyncHandler(async (req, res, next) => {
    try {

        const books = await Book.find();
        books.sort((a,b)=>{

            if (a.title > b.title)
                return 1
            if (a.title < b.title)
                return -1
            return 0;
        });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET one book
exports.bookGetOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Extracting ID from the request parameters

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book); // Return the found book
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET SEARCH BOOK
exports.bookSearch = asyncHandler(async (req, res, next) => {

    try {
        const {filters, sortBy, sortOrder, offset, limit}=parseQueryString(req.query);
        console.log(filters);
        console.log(sortBy);
        console.log(sortOrder);
        console.log(limit);
        console.log(offset);
        const query=buildQuery(filters)

        let books =  await Book.find(query).sort({ [sortBy]: sortOrder }).limit(limit).skip(offset);
        const booksTotal = await Book.countDocuments(query);
        // console.log({ books, booksTotal })
        res.json({ books, booksTotal });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Handle book create on POST.
exports.bookCreatePost = asyncHandler(async (req, res, next) => {
    const { title, author, publishedYear, genre, publisher, cover ,price ,img } = req.body;

    const newBook = new Book({
        title,
        author,
        publishedYear,
        genre,
        publisher,
        cover,
        price,
        img
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
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.deleteOne();

        res.status(200).json({message:'Book deleted'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET one book
exports.getBookProperties = asyncHandler(async (req, res, next) => {

    try {
        // Get distinct genres, authors, and publishers from the database
        const genres = await Book.distinct('genre');
        const prices = await Book.distinct('price');
        const publishers = await Book.distinct('publisher');
        const covers = await Book.distinct('cover');


        // Send response with properties
        res.status(200).json({  genres, prices, publishers, covers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


function parseQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const filters = {};

    let sortBy = '_id';
    let sortOrder = 'asc';
    let offset = 0;
    let limit = 5;

    for (const [key, value] of params) {
        if (key === 'sort') {
            sortBy = value;
        } else if (key === 'order') {
            sortOrder = value === 'desc' ? 'desc' : 'asc';
        } else if (key === 'offset') {
            offset = parseInt(value, 10) || 1;
        } else if (key === 'limit') {
            limit = parseInt(value, 10) || 10;
        } else {
            filters[key] = parseFilter(value);
        }
    }


    return {filters, sortBy, sortOrder, offset, limit};
}
function parseFilter(value) {
    const match = value.match(/(<=|>=|<|>)(\d+)/);
    if (match) {
        const [, operator, number] = match;
        return {[operator]: Number(number)};
    } else if (value.includes('-')) {
        const [min, max] = value.split('-').map(Number);
        return {min, max};
    } else if(!isNaN(parseInt(value))) {
        const number = Number(value);
        return {min: number, max: number};
    }
    else return value;

}
function buildQuery(filters) {
    const query = {};
    for (const [key, value] of Object.entries(filters)) {
        if (typeof value === 'object' && value !== null) {
            query[key] = buildComparisonQuery(value);
        } else {
            query[key] = value;
        }
    }
    return query;
}
function buildComparisonQuery(filter) {
    const comparisonQuery = {};
    for (const [operator, value] of Object.entries(filter)) {
        switch (operator) {
            case 'min':
                comparisonQuery['$gte'] = value;
                break;
            case 'max':
                comparisonQuery['$lte'] = value;
                break;
            case '<':
                comparisonQuery['$lt'] = value;
                break;
            case '<=':
                comparisonQuery['$lte'] = value;
                break;
            case '>':
                comparisonQuery['$gt'] = value;
                break;
            case '>=':
                comparisonQuery['$gte'] = value;
                break;
            default:
                throw new Error(`Unknown comparison operator: ${operator}`);
        }
    }
    return comparisonQuery;
}
