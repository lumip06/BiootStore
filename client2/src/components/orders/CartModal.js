import React, {useEffect, useState} from 'react';
import "../../styles/CartModal.css"
import {useBoundStore} from "../../stores/BoundStore";
import {Link} from "react-router-dom";
import {calculateTotalPrice,  useFetchBookInfos} from "./CartUtils";
import Status from "../common/Status";


function CartModal({onCloseModal}) {
    const { loadingOrders,errorOrders } = useBoundStore();
    const {cartBooks, removeBookFromCart} = useBoundStore();
    const [bookInfos, setBookInfos] = useState({});
    const totalPrice = calculateTotalPrice(cartBooks, bookInfos);
    const fetchBookInfos = useFetchBookInfos();

    useEffect(() => {

        fetchBookInfos(setBookInfos);
    }, [cartBooks]);


    return (

        <div id="cartModal">
            <Status loading={loadingOrders} error={errorOrders}>


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
                            <h3>
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
                <p >No books available</p>
            )}
            <hr className="solid"/>
            <h1>TOTAL: ${totalPrice} </h1>

            <Link to="/orders" onClick={onCloseModal} className="btn btn-outline-light btn-lg">Finalize Order</Link>
            </Status>

        </div>


    )
}

export default CartModal;