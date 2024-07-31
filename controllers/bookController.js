const book =require('../models/bookModel')
const asyncHandler = require("express-async-handler");
var qs = require('qs');




// Display list of all books.
exports.bookList = asyncHandler(async (req, res, next) => {
    try {
        const books = await book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Display list of all books sorted by criteria
exports.bookSorted = asyncHandler(async (req, res, next) => {
    try {

        const books = await book.find();
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
        const book = await book.findById(id);
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
        let queries=parseQueryString(req.query);
        let {sorts,limit,offset}=separateFilters(queries);
        // console.log(queries);
        // console.log(sorts);
        // console.log(limit);
        // console.log(offset);

        let books =  await book.find(queries).sort(sorts).limit(limit);

    res.json(books);
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

function parseQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const filters = {};

    for (const [key, value] of params) {
        switch (key) {
            case 'title':
                filters.title = value.split(',').map(genre => genre.trim());
                break;
            case 'author':
                filters.author = value.split(',').map(genre => genre.trim());
                break;
            case 'publishedYear':
                if (value.includes('-')) {
                    const [minYear, maxYear] = value.split('-').map(Number);
                    filters.publishedYear = {min: minYear, max: maxYear};
                } else {
                    filters.key = {operator:'-',min: Number(value), max: Number(value)};
                }
                break;
            case 'genre':
                filters.genre = value.split(',').map(genre => genre.trim());
                break;
            case 'publisher':
                filters.genre = value.split(',').map(genre => genre.trim());
                break;
            case 'cover':
                filters[key] = value;
                break;
                //TODO DE ADAUGAT PRICE
            case 'limit':
                filters[key] = value;
                break;
            case 'offset':
                filters[key] = value;
                break;
            case 'sort':
                filters.sort = value.split(',').map(genre => genre.trim());
                break;
            case 'order':
                filters.order = value.split(',').map(genre => genre.trim());
                break;
            default:
                filters[key] = value;
                break;
        }
    }

    return filters;
}

function separateFilters(queries){

    if(queries.limit)
        limit=queries.limit;
    else limit=2;
    if(queries.offset)
        offset=queries.offset;
    else offset=0;


    let sorts=[];
    for(par in queries.sort){
        //console.log(queries.sort[par]);
        if(queries.order[par])
            sorts.push([queries.sort[par],queries.order[par]]);
        else sorts.push([queries.sort[par],"asc"]);
    }
    delete queries.limit;
    delete queries.offset;
    delete queries.sort;
    delete queries.order;

    return {sorts,limit,offset};
}

