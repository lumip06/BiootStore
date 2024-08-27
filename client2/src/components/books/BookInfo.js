import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {useBoundStore} from "../../stores/BoundStore";
import {checkBookInCart} from "../orders/CartUtils";
import BookItem from "./BookItem";
import Status from "../common/Status";
import {Spinner} from "react-bootstrap";

function BookInfo() {
    const {  cartBooks ,selectedBook, selectBook } = useBoundStore();
    const { id } = useParams();
    const [inCart, setInCart] = useState(false);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const { loadingBooks, errorBooks, setLoadingBooks, setErrorBooks } = useBoundStore();
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
            setLoadingBooks(true);setErrorBooks(null);
            fetchBook();
            setLoadingBooks(false);
        }
    }, [id, cartBooks, selectedBook,quantityInCart]);

    if (!selectedBook[id]) {

        return  (
            <div className="bookDetails">
                <Status loading={loadingBooks} error={errorBooks}>
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </Status>
            </div>
        );

    }


    return (
        <div className="bookDetails">
            <Status loading={loadingBooks} error={errorBooks}>
            <BookItem book={selectedBook[id]} index={id} view={"pageView"} inCart={inCart}/>
            </Status>

        </div>
    )
}

export default BookInfo;