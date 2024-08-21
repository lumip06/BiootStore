import React, {useEffect, useState} from 'react';
import qs from 'qs';
import "../../styles/CartModal.css"
import {useBoundStore} from "../../stores/BoundStore";
import {Link} from "react-router-dom";
import {calculateTotalPrice, processBooksData} from "./CartUtils";
import {useFetchRequest} from "../../api/CustomHook";
import {getCartBooksInfos} from "../../api/BookAPI";
import Status from "../common/Status";

const serverUrl = process.env.REACT_APP_SERVER_URL;


function CartModal({onCloseModal}) {

    const {cartBooks, removeBookFromCart, getCartBookIds, getToken} = useBoundStore();
    const [bookInfos, setBookInfos] = useState({});
    const totalPrice = calculateTotalPrice(cartBooks, bookInfos);
    const {apiCall, loading, error} = useFetchRequest();


    useEffect(() => {


        const fetchBookInfos = () => {

            const cartBookIds = getCartBookIds();

            if (cartBookIds.length > 0) {
                // No need to stringify for the URL since we're sending the data in the body
                const requestBody = { ids: cartBookIds };

                apiCall(
                    `${serverUrl}books/infos`, // Endpoint URL without query parameters
                    'POST', // Using POST method now
                    requestBody, // Sending the cartBookIds in the body
                    [
                        (booksData) => {
                            processBooksData(booksData, setBookInfos);
                        }
                    ],
                    [console.error]
                );
            } else {
                setBookInfos({});
            }
        };

        fetchBookInfos();
    }, [cartBooks]);


    return (

        <div id="cartModal" style={{padding: "50px", paddingTop: "100px"}}>

            <Status loading={loading} error={error}/>

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
                                className="btn btn-outline-dark btn-lg">
                                &#10006;
                            </button>
                        </div>
                    );
                })
            ) : (
                <p style={{fontSize: "50px"}}>No books available</p>
            )}
            <hr className="solid"/>
            <h1>TOTAL: {totalPrice} </h1>

            <Link to="/orders" onClick={onCloseModal} className="btn btn-outline-light btn-lg">Finalize Order</Link>


        </div>


    )
}

export default CartModal;