import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getOneBook} from "../../ServerCalls";

function BookInfo() {
    const {id} = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const bookCache = {};

    useEffect(() => {
        const fetchBook = async () => {
            if (bookCache[id]) {
                setBook(bookCache[id]);
            } else {
                try {
                    setLoading(true);
                    const response = await getOneBook(id);

                    // Assuming the response contains the JSON data of the book
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    bookCache[id] = data; // Store in cache

                    setBook(data); // Set the book data to state
                } catch (error) {
                    console.error('Error fetching book properties:', error);
                    setError('Failed to fetch book data'); // Set error message to state
                } finally {
                    setLoading(false);
                }
            }
        };

        if (id) {
            fetchBook(); // Fetch the book data only if bookId is provided
        }
    }, [id]); // Dependency array - fetch book when bookId changes

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="bookDetails">
            <div className="col1">
                <img className="card-img-top" src={book.img} alt="Book cover"/>
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