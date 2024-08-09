import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getOneBook} from "../../API";
import {useBoundStore} from "../../BoundStore";

function BookInfo() {
    const {id} = useParams(); // Get the book ID from the URL
    const {addBookToCart}=useBoundStore();

    const {selectedBook,selectBook}=useBoundStore()
    useEffect(() => {
        const fetchBook = async () => {
            console.log("IDUL MEU" + id)

                if (!selectedBook[id]) {
                    await selectBook(id); // Wait for the book to be fetched
                }

        };

        if (id) {
            fetchBook(); // Fetch the book data only if bookId is provided
        }
    }, [id]); // Dependency array - fetch book when bookId changes
// Handle case where book is not found

    if (!selectedBook[id]) {
        return <div>No book found.</div>;
    }

    return (
        <div className="bookDetails">
            <div className="col1">
                <img className="card-img-top" src={selectedBook[id].img} alt={selectedBook[id].title}/>
                <h1>{selectedBook[id]?.title || 'No title available'}</h1>
                <h2>Author: {selectedBook[id].author}</h2>
                <p>Genre: {selectedBook[id].genre}</p>
                <p>Year of release: {selectedBook[id].publishedYear}</p>
                <p>Publisher: {selectedBook[id].publisher}</p>
                <p>Cover type: {selectedBook[id].cover}</p>
            </div>
            <div className="col2">
                <p>Price: {selectedBook[id].price}</p>
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px', marginRight: '30px'}}>
                    <button  className="btn btn-outline-dark btn-lg" onClick={ () => addBookToCart(selectedBook[id]._id)}> ADD to Cart</button>
                </div>
            </div>


        </div>
    )
}

export default BookInfo;