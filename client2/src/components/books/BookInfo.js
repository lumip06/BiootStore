import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {useBoundStore} from "../../stores/BoundStore";
import {checkBookInCart} from "../orders/CartUtils";
import BookItem from "./BookItem";

function BookInfo() {
    const {  cartBooks ,selectedBook, selectBook } = useBoundStore();
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
    }, [id, cartBooks, selectedBook,quantityInCart]);

    if (!selectedBook[id]) {
        return <div>No book found.</div>;
    }


    return (
        <div className="bookDetails">

            <BookItem book={selectedBook[id]} index={id} view={"pageView"} inCart={inCart}/>


        </div>
    )
}

export default BookInfo;