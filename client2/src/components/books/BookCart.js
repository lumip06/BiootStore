
import React, {useEffect, useState} from "react";
import {useBoundStore} from "../../BoundStore";

function BookCart() {
const {cartBooks,addBookToCart}=useBoundStore();
    return (
        <div className="bookDetails">
            <div >

            </div>


        </div>
    )
}

export default BookCart;