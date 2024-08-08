import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getOneBook} from "../../API";
import {useBoundStore} from "../../BoundStore";

function BookInfo() {
    const {id} = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);

    const {selectedBook,selectBook}=useBoundStore()
    useEffect(() => {
        const fetchBook = async () => {
            console.log("IDUL MEU" + id)
            if (selectedBook[id]) {
                setBook(selectedBook[id]);
            } else {
                if (!selectedBook[id]) {
                    await selectBook(id); // Wait for the book to be fetched
                }
                setBook(selectedBook[id]);
            }
        };

        if (id) {
            fetchBook(); // Fetch the book data only if bookId is provided
        }
    }, [id, selectBook, selectedBook]); // Dependency array - fetch book when bookId changes
// Handle case where book is not found

    if (!book) {
        return <div>No book found.</div>;
    }

    return (
        <div className="bookDetails">
            <div className="col1">
                <img className="card-img-top" src={book.img} alt={book.title}/>
                <h1>{book?.title || 'No title available'}</h1>
                <h2>Author: {book.author}</h2>
                <p>Genre: {book.genre}</p>
                <p>Year of release: {book.publishedYear}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Cover type: {book.cover}</p>
            </div>
            <div className="col2">
                <p>Price: {book.price}</p>
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px', marginRight: '30px'}}>
                    <button  className="btn btn-outline-dark btn-lg"> ADD to Cart</button>
                </div>
            </div>
            {/* Add more details as needed */}

        </div>
    )
}

export default BookInfo;