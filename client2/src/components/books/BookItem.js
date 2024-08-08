import React from 'react';
import {Link} from "react-router-dom";
import "./../../styles/BookItem.css"

function BookItem({book, index, view}) {
    console.log(book._id)
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
        </div>


    )
}

export default BookItem;