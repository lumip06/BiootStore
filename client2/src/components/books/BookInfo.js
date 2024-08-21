import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {useBoundStore} from "../../stores/BoundStore";
import {checkBookInCart} from "../orders/CartUtils";

function BookInfo() {
    const { addBookToCart, cartBooks ,selectedBook, selectBook} = useBoundStore();
    const { id } = useParams();
    const [inCart, setInCart] = useState(false);
    const [quantityInCart, setQuantityInCart] = useState(0);

    useEffect(() => {
        const fetchBook = async () => {
            if (!selectedBook[id]) {
                await selectBook(id);
            }

            if (checkBookInCart(cartBooks, id)) {
                setInCart(true);

                const quantity = cartBooks[id];
                if (quantity) {
                    setQuantityInCart(quantity);
                }
            } else {
                setInCart(false);
                setQuantityInCart(0);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id, cartBooks, selectedBook]);

    if (!selectedBook[id]) {
        return <div>No book found.</div>;
    }

    const stock = selectedBook[id].stock;
    const availableQuantity = stock - quantityInCart;
    const isButtonDisabled = stock === 0 || availableQuantity <= 0;


    const handleAddToCart = () => {
        addBookToCart(selectedBook[id]._id);
        setQuantityInCart(prevQuantity => prevQuantity + 1);
    };

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
                <p>In Stock: {availableQuantity ? 'Yes' : 'No'}</p>
                <p>Available to Add to Cart: {availableQuantity > 0 ? availableQuantity : 0}</p>
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px', marginRight: '30px'}}>
                    <button className="btn btn-outline-dark btn-lg"
                            disabled={isButtonDisabled}
                            onClick={handleAddToCart}>
                        ADD to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookInfo;