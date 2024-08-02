import React from 'react';
import {Link} from "react-router-dom";

function BookItem({book,index}) {
    console.log(book._id)
    return (
                        <div className="card" style={{width: '18rem'}}>
                            <Link to={`/books/${book._id}`}>
                                <img className="card-img-top" src={book.img} alt="Card image cap"/>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"> {book.id}</li>
                                        <li className="list-group-item">{book.title}</li>
                                        <li className="list-group-item"> {book.author}</li>
                                        <li className="list-group-item">    {book.genre}</li>
                                        <li className="list-group-item">   {book.price}</li>
                                    </ul>


                                    {/*{book.publishedYear}*/}

                                    {/*{book.publisher}*/}
                                    {/*{book.cover}*/}


                                </div>
                            </Link>
                        </div>


    )
}

export default BookItem;