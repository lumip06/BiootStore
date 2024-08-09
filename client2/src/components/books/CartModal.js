import React, {useEffect, useState} from 'react';

import "./../../styles/CartModal.css"
import {useBoundStore} from "../../BoundStore";
import {Link} from "react-router-dom";
import {getCartBooksInfos} from "../../API";


function CartModal({ onCloseModal }) {

    const {cartBooks,removeBookFromCart,getCartBookIds}=useBoundStore()
    const [bookInfos, setBookInfos] = useState({});

    // console.log(cartBookIds)
    // console.log(getCartBooksInfos(cartBookIds))
    useEffect(() => {
        // Fetch book info when the component mounts
        const fetchBookInfos = async () => {
            const cartBookIds = getCartBookIds();

            // Check if there are valid book IDs before making the fetch call
            if (cartBookIds.length > 0) {
                try {
                    const booksData = await getCartBooksInfos(cartBookIds);

                    // Convert array to an object where keys are book IDs for easier access
                    const booksObject = booksData.reduce((acc, book) => {
                        acc[book._id] = book;
                        return acc;
                    }, {});

                    setBookInfos(booksObject); // Store the booksObject in state
                } catch (error) {
                    console.error('Failed to fetch book infos:', error);
                }
            } else {
                // Optionally, you can reset the bookInfos or handle the case where there are no books
                setBookInfos({});
            }
        };

        fetchBookInfos();
    }, []);

    // Calculate the total price
    const calculateTotalPrice = () => {
        return Object.entries(cartBooks).reduce((total, [bookId, quantity]) => {
            const bookInfo = bookInfos[bookId];
            if (bookInfo) {
                return total + (bookInfo.price * quantity);
            }
            return total;
        }, 0);
    };

    const totalPrice = calculateTotalPrice();


    return (

        <div id="cartModal" style={{padding:"50px",paddingTop:"100px"}}>


            <div>
                {Object.keys(cartBooks).length > 0 ? (
                    Object.entries(cartBooks).map(([bookId, quantity], index) => {
                        const bookInfo = bookInfos[bookId];

                        if (!bookInfo) {
                            return (
                                <div className="cartItem" key={index}>
                                    <h3>Loading book info...</h3>
                                </div>
                            );
                        }

                        return (
                            <div className="cartItem" key={index}>
                                <h3 style={{paddingRight: "50px"}}>
                                    {quantity} X {bookInfo.title} by {bookInfo.author} Price: {bookInfo.price}
                                </h3>
                                <button
                                    onClick={() => removeBookFromCart(bookId)}
                                    className="btn btn-outline-dark btn-lg"
                                >
                                    &#10006;
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p style={{fontSize:"50px"}}>No books available</p>
                )}
                <hr className="solid"/>
                <h1>TOTAL: {totalPrice} </h1> {/* Display the total price */}

                <Link to="/orders" onClick={onCloseModal} className="btn btn-outline-dark btn-lg">Finalize Order</Link>
            </div>

        </div>


    )
}

export default CartModal;