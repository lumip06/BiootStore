import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./../../styles/BookItem.css"
import {useBoundStore} from "../../stores/BoundStore";

function BookItem({book, index, view}) {
    const {addBookToCart,loggedInUser}=useBoundStore();
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
                    {view!=='miniView' && (
                        <img className="card-img-top" src={book.img} alt="card " onError={event => {
                            event.target.src = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1645580888i/60478042.jpg"
                            event.onerror = null
                        }}/>
                    )}

                    <p className={`text${view}`}>{book.id}</p>
                    <p className={`text${view}`}>{book.title}</p>
                    <p className={`text${view}`}>by {book.author}</p>
                    {(view!=="miniView")&&(<p className={`text${view}`}>{book.genre}</p>)}
                    <p className={`text${view}`}>Price:{book.price}</p>

                </div>
            </Link>
            {(loggedInUser?.role==="client" || !loggedInUser) && view!=="miniView" &&(
            <button className="btn btn-outline-light btn-lg "  disabled={isButtonDisabled} onClick={handleAddToCart}> ADD to Cart</button>
                )}
        </div>


    )
}

export default BookItem;