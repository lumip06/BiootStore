import React, {useEffect, useState} from 'react';

import "../../styles/CartModal.css"
import {useBoundStore} from "../../stores/BoundStore";
import {Link} from "react-router-dom";
import {getCartBooksInfos} from "../../api/OrderAPI";
import {calculateTotalPrice} from "./CartUtils";
import {useFetchRequest} from "../../api/CustomHook";
const serverUrl = process.env.REACT_APP_SERVER_URL;


function CartModal({ onCloseModal }) {

    const { cartBooks, removeBookFromCart, getCartBookIds } = useBoundStore();
    const [bookInfos, setBookInfos] = useState({});
    const totalPrice = calculateTotalPrice(cartBooks, bookInfos);
    const { apiCall, loading, error } = useFetchRequest();

    useEffect(() => {
        const fetchBookInfos = () => {
            const cartBookIds = getCartBookIds();

            if (cartBookIds.length > 0) {
                const token = localStorage.getItem('token'); // Or however you are managing your tokens

                // Create query parameters
                const queryParams = new URLSearchParams({ ids: cartBookIds.join(',') }).toString();

                apiCall(
                    `${serverUrl}books/infos?${queryParams}`, // Append query parameters
                    'GET',
                    null,
                    [
                        (booksData) => {
                            const booksObject = booksData.reduce((acc, book) => {
                                acc[book._id] = book;
                                return acc;
                            }, {});
                            setBookInfos(booksObject);
                        }
                    ], // Success callback
                    [console.error],
                    token // Pass token for authorization
                );
            } else {
                setBookInfos({});
            }
        };

        fetchBookInfos();
    }, [getCartBookIds]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


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
                <h1>TOTAL: {totalPrice} </h1>

                <Link to="/orders" onClick={onCloseModal} className="btn btn-outline-dark btn-lg">Finalize Order</Link>
            </div>

        </div>


    )
}

export default CartModal;