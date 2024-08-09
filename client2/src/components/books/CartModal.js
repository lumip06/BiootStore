import React from 'react';

import "./../../styles/CartModal.css"
import {useBoundStore} from "../../BoundStore";
import {Link} from "react-router-dom";


function CartModal({ onCloseModal }) {

    const {cartBooks,removeBookFromCart}=useBoundStore()
    return (

        <div id="cartModal" style={{padding:"50px"}}>


            <div>
                {Object.keys(cartBooks).length > 0 ? (
                    Object.entries(cartBooks).map(([bookId, quantity], index) => (
                        <div className="cartItem" key={index}>
                            <h3 style={{paddingRight:"25px"}}>{quantity} X {bookId} </h3>
                            <button onClick={()=>removeBookFromCart(bookId)} className="btn btn-outline-dark btn-lg">&#10006;</button>
                        </div>
                    ))
                ) : (
                    <p>No books available.</p>
                )}
                <hr className="solid"/>
                <h1>TOTAL: </h1>

                <Link to="/orders" onClick={onCloseModal} className="btn btn-outline-dark btn-lg">Finalize Order</Link>
            </div>

        </div>


    )
}

export default CartModal;