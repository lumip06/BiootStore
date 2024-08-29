import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./../../styles/BookItem.css"
import {useBoundStore} from "../../stores/BoundStore";
import Status from "../common/Status";
import BookPageView from "./BookPageView";
import {handleAddToCart, handleAddToWishlist} from "./BookUtils";
import {checkBookInCart} from "../orders/CartUtils";
import {Spinner} from "react-bootstrap";

function BookItem({book,view}) {
    const {addBookToCart, loggedInUser,wishlistBooks,setWishlistBooks,getRole ,cartBooks} = useBoundStore();
    const { loadingBooks, errorBooks, setLoadingBooks, setErrorBooks } = useBoundStore();
    const { selectedBook, selectBook } = useBoundStore();
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [inCart, setInCart] = useState(false);


    useEffect(() => {
        const fetchBook = async () => {
            if (!selectedBook[book._id]&&view==="pageView") {
                await selectBook(book._id);
            }

            if (checkBookInCart(cartBooks, book._id)) {
                setInCart(true);

                const quantity = cartBooks[book._id];
                if (quantity) {
                    setQuantityInCart(quantity);
                }
            } else {
                setInCart(false);
                setQuantityInCart(0);
            }
        };

        if (book._id) {

            fetchBook();

        }
    }, [cartBooks,quantityInCart]);


    if (!selectedBook[book._id]&&view==="pageView") {

        return  (
            <div className="bookDetails">
                <Status loading={loadingBooks} error={errorBooks}>
                    <Spinner animation="border" role="status">
                        <p>Loading...</p>
                    </Spinner>
                </Status>
            </div>
        );

    }

    // const stock = selectedBook[book._id].stock;
    const isButtonDisabled = book.stock === 0 || (book.stock - quantityInCart) <= 0;


    return (

        <div className={view}>
            {(view === "pageView") && (
                <BookPageView book={selectedBook[book._id]}
                              view={view}
                              inCart={inCart}
                              stock={selectedBook[book._id].stock}
                              quantityInCart={quantityInCart}
                              setQuantityInCart={setQuantityInCart}></BookPageView>
                )}

            {view !== "pageView" && (

                <div>111
                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                        <div className={`wrapper${view}`}>
                            <Status loading={loadingBooks} error={errorBooks}>
                            {view !== 'miniView' && (
                                <img className="card-img-top" src={book.img} alt="card" onError={event => {
                                    event.target.src = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1645580888i/60478042.jpg";
                                    event.onerror = null;
                                }}/>
                            )}

                            <p className={`text${view}`}>{book._id}</p>
                            <p className={`text${view}`}>{book.title}</p>
                            <p className={`text${view}`}>by {book.author}</p>
                            {view !== "miniView" && (<p className={`text${view}`}>{book.genre}</p>)}
                            <p className={`text${view}`}>Price: {book.price}</p>
                            </Status>
                        </div>
                    </Link>
                    {(getRole() === "client" || !loggedInUser) && view !== "miniView" && (
                        <div>
                            <button className="btn btn-outline-light btn-lg"
                                    disabled={isButtonDisabled}
                                    onClick={() => handleAddToCart(book._id, setQuantityInCart, addBookToCart)} >
                                ADD to Cart
                            </button>
                            <span className="tool-tip" data-toggle="tooltip" data-placement="top"
                                  title="Need to login">
                            <button className="btn btn-outline-light btn-lg" disabled={!loggedInUser}
                                    onClick={() => handleAddToWishlist(selectedBook[book._id], wishlistBooks, setWishlistBooks)}>
                                <svg viewBox="0 0 1024 1024" className="icon" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" fill="#000000" height="20px">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M505.5 215.9m-62.6 0a62.6 62.6 0 1 0 125.2 0 62.6 62.6 0 1 0-125.2 0Z"
                                              fill="#FFB89A"></path>
                                        <path
                                            d="M793.4 660.2c-16.2-32.1-22.4-62.8-24.7-78.3-0.6-4.1-0.9-8.3-1-12.5l-1.2-124.5v-3.7c0-2.9-0.1-5.9-0.2-8.8l-0.1-14.2h-0.8c-2.1-22.3-7.2-44.2-15.2-65.2-10.4-27.2-25.5-52.5-44.9-75.2-33.6-39.3-79-69-129.6-85.1-7.4-53.6-49.5-94.7-100.2-94.7-52.7 0-96.1 44.5-100.9 101.1-46.6 18.2-86.9 47.6-117.4 85.9-31.3 39.3-49.8 84.9-54.3 133.2h-0.9v157.4c-0.1 1.6-1.9 27.4-37.6 79.1-13.7 19.8-46.8 70.1-54.6 81.9-10.8 12-14.1 28.8-8.2 44.2 6.4 17 22.3 28 40.5 28h666.8c18.1 0 34-10.9 40.5-27.9 5.9-15.4 2.7-32.2-8.1-44.2-16-24.2-41.8-64.5-47.9-76.5z m-619.8 88.7c13.1-19.8 31.2-47.2 40.2-60.1 16.7-24.2 29.3-47 37.6-67.8 6.7-16.9 10.4-32.2 10.6-44.4v-0.5-2.4V570.8v-0.3l0.3-29.9h-0.4v-62.4h1.1l-1-31c-0.1-2.3-0.1-4.3-0.1-6.1 0-43 14.6-84.1 42.3-118.8 27.5-34.5 65.3-59.9 109.4-73.3l23.9-7.3-2.9-24.8c-0.3-2.5-0.4-5-0.4-7.3 0-28.4 18.5-51.6 41.3-51.6s41.3 23.1 41.3 51.6c0 1.2-0.1 2.5-0.2 4.2l-1.7 25.4 24.8 5.8c47.2 11.1 89.8 36.6 120 71.9 30.6 35.8 46.8 78.8 46.8 124.3 0 1.8 0 3.8-0.1 6.1l-1 31h1.4l0.9 91.7c0.1 6.9 0.6 13.9 1.6 20.7 2.8 19.1 10.5 57 30.5 96.6 6.3 12.4 24.4 40.9 37.7 61.6H173.6zM693 230.5c26.6 8.5 55 36 74 71.8 7.7 14.5 13.4 29.4 17 44.2 3.3 13.7 15.6 22.9 29.1 22.9 2.3 0 4.7-0.3 7.1-0.9 16.1-3.9 26-20.1 22.1-36.2-4.8-19.7-12.3-39.3-22.4-58.2-26.5-49.9-67.2-87.6-108.8-100.8-15.8-5-32.7 3.7-37.7 19.5s3.8 32.7 19.6 37.7zM928.2 296.7c-8.2-29.9-22.2-60.7-40.4-89.2-31.3-48.9-73.7-88.1-116.2-107.6-15.1-6.9-32.9-0.3-39.8 14.8-6.9 15.1-0.3 32.9 14.8 39.8 32.3 14.8 65.4 45.9 90.7 85.4 15 23.4 26.4 48.5 33.1 72.7 3.7 13.3 15.7 22.1 28.9 22.1 2.6 0 5.3-0.3 8-1.1 15.9-4.4 25.3-21 20.9-36.9z"
                                            fill="#f7d350"></path>
                                        <path
                                            d="M555.8 812.1c-16.6 0-30 13.4-30 30 0 8.5-1.3 16.8-3.8 24.6-5.1 15.8 3.5 32.7 19.2 37.8 3.1 1 6.2 1.5 9.3 1.5 12.6 0 24.4-8 28.5-20.7 4.5-13.8 6.8-28.4 6.8-43.2 0-16.5-13.5-30-30-30zM475.5 906.6c-12.5 0-24.5-6.1-33.9-17.1-10.6-12.4-16.4-29.3-16.4-47.4 0-16.6-13.4-30-30-30s-30 13.4-30 30c0 32.4 10.9 63 30.6 86.2 21 24.7 49.2 38.3 79.6 38.3 16.6 0 30-13.4 30-30s-13.3-30-29.9-30z"
                                            fill="#33CC99"></path>
                                    </g>
                                </svg>
                            </button>
                                </span>
                        </div>
                    )}
                </div>

            )
            }
        </div>



    )
}

export default BookItem;