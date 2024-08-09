import React from 'react';
import {Link} from "react-router-dom";
import "./../../styles/BookItem.css"
import {useBoundStore} from "../../BoundStore";

function BookItem({book, index, view}) {
    const {addBookToCart}=useBoundStore();
    return (

        <div className={view}>
            <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                <div className={`wrapper${view}`}>
                    <img className="card-img-top" src={book.img} alt="Card "/>
                    <p className={`text${view}`}>{book.id}</p>
                    <p className={`text${view}`}>{book.title}</p>
                    <p className={`text${view}`}>{book.author}</p>
                    <p className={`text${view}`}>{book.genre}</p>
                    <p className={`text${view}`}>{book.price}</p>

                </div>
            </Link>
            <button className="btn btn-outline-dark btn-lg" onClick={ () => addBookToCart(book._id)}> ADD to Cart</button>
        </div>


    )
}

export default BookItem;