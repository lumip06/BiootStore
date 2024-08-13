import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {useBoundStore} from "../../stores/BoundStore";
import {checkBookInCart} from "../orders/CartUtils";

function BookInfo() {
    const {id} = useParams();
    const {addBookToCart, cartBooks} = useBoundStore();
    const [inCart, setInCart] = useState(false);

    const {selectedBook, selectBook} = useBoundStore();

    useEffect(() => {
        const fetchBook = async () => {


            if (!selectedBook[id]) {
                await selectBook(id);
            }

            // Check if the book is in the cart
            if (checkBookInCart(cartBooks,id)) {
                setInCart(true);
            } else {
                setInCart(false);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id, cartBooks]);

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
                <p>{inCart ? 'Book in cart' : ''}</p>
                <p>Price: {selectedBook[id].price}</p>

                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px', marginRight: '30px'}}>
                    <button className="btn btn-outline-dark btn-lg"
                            onClick={() => addBookToCart(selectedBook[id]._id)}>
                        ADD to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookInfo;