import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./../../styles/BookItem.css"
import {useBoundStore} from "../../stores/BoundStore";

function BookItem({book, index, view}) {
    const {addBookToCart}=useBoundStore();
    const [quantityInCart, setQuantityInCart] = useState(0);
    const stock = book.stock;
    const availableQuantity = stock - quantityInCart;

    const isButtonDisabled = stock === 0 || availableQuantity <= 0;

    const handleAddToCart = () => {
        addBookToCart(book._id);
        setQuantityInCart(prevQuantity => prevQuantity + 1);
    };
    return (

        <div className={view}>
            <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                <div className={`wrapper${view}`}>
                    <img className="card-img-top" src={book.img} alt="card "/>
                    <p className={`text${view}`}>{book.id}</p>
                    <p className={`text${view}`}>{book.title}</p>
                    <p className={`text${view}`}>{book.author}</p>
                    <p className={`text${view}`}>{book.genre}</p>
                    <p className={`text${view}`}>{book.price}</p>

                </div>
            </Link>
            <button className="btn btn-outline-light btn-lg"  disabled={isButtonDisabled} onClick={handleAddToCart}> ADD to Cart</button>
        </div>


    )
}

export default BookItem;