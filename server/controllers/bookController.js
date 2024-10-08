const Book =require('../models/bookModel')
const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");


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
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//GET BOOK INFOS FOR CART
exports.bookGetInfosByIds = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;
    console.log("IDS", ids);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'No IDs provided or IDs are not in array format' });
    }

    try {

        const objectIdsArray = ids.map(id => new mongoose.Types.ObjectId(id.trim()));
        console.log('ObjectIds Array:', objectIdsArray);

        const books = await Book.find({ _id: { $in: objectIdsArray } }).select('title author price stock');
        console.log(books)
        if (!books.length) {
            return res.status(404).json({ error: 'No books found for the provided IDs' });
        }

        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.json({ books, booksTotal });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Handle book create on POST.
exports.bookCreatePost = asyncHandler(async (req, res, next) => {
    try {

        if (!Array.isArray(req.body)) {
            return res.status(400).send({ message: "Request body must be an array" });
        }

        const books = req.body.map(book => {
            const { title, author, publishedYear, genre, publisher, cover, price, stock, img } = book;
            if (!title || !author || !publishedYear || !publisher || !cover || !price || !stock || !img) {
                throw new Error("All fields are required");
            }
            return new Book(book);
        });


        const savedBooks = await Book.insertMany(books);
        res.status(201).send(savedBooks);
    } catch (error) {
        res.status(400).send({ message: error.message });
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

        const genres = await Book.distinct('genre');
        const prices = await Book.distinct('price');
        const publishers = await Book.distinct('publisher');
        const covers = await Book.distinct('cover');

        res.status(200).json({  genres, prices, publishers, covers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


exports.updateBookStock = asyncHandler(async (req, res, next) => {
    try {

        if (!Array.isArray(req.body.items)) {
            return res.status(400).json({ message: "Request body must contain an array of items" });
        }


        const updatePromises = req.body.items.map(async (item) => {
            const { bookId, quantity } = item;


            if (!bookId || typeof quantity !== 'number' || quantity <= 0) {
                throw new Error("Invalid item data. 'bookId' and 'quantity' are required, and 'quantity' must be a positive number.");
            }


            const book = await Book.findById(bookId);
            if (!book) {
                throw new Error(`Book with ID ${bookId} not found.`);
            }


            if (book.stock < quantity) {
                throw new Error(`Not enough stock for book ID ${bookId}. Available: ${book.stock}, Requested: ${quantity}`);
            }


            book.stock -= quantity;
            return book.save();
        });


        const updatedBooks = await Promise.all(updatePromises);
        console.log("Updated books:", updatedBooks);

        next();

    } catch (error) {
        console.error("Error updating book stock:", error.message);
        res.status(400).json({ message: error.message });
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
