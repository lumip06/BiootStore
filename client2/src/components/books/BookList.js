import React, {useEffect, useState} from 'react';

import BookItem from './BookItem';
import {useBoundStore} from "../../stores/BoundStore";
import Counters from "./Counters";
import {Link} from "react-router-dom";


function BookList() {

    const {filters, books, fetchBooks, limit, page,loggedInUser} = useBoundStore();
    const [viewType, setViewType] = useState('card');

    useEffect(() => {
        fetchBooks();
    }, [filters, limit, page]);


    return (
        <div className="container-fluid">
            <div id="viewChanger" style={{display: 'flex'}}>
                <div style={{justifyContent: 'flex-start', padding: '15px', marginRight: '350px'}}>
                    <Counters/>
                </div>

                {/* Check if loggedInUser exists and if the role is "admin" */}
                {(loggedInUser?.role === "admin" ) && (
                    <div style={{justifyContent: 'flex-end', padding: '15px'}}>
                        <Link to="/book" id="buttonNewBook" className="btn btn-outline-dark">
                            Add new book
                        </Link>
                    </div>
                )}

                <div style={{justifyContent: 'flex-end', padding: '15px'}}>
                    <button
                        id="buttoncard"
                        className="btn btn-outline-dark"
                        disabled={viewType === "card"}
                        onClick={() => setViewType("card")}
                    >
                        CardView
                    </button>
                    <button
                        id="buttonlist"
                        className="btn btn-outline-dark"
                        disabled={viewType === "list"}
                        onClick={() => setViewType("list")}
                    >
                        ListView
                    </button>
                </div>
            </div>

            <div className={`${viewType + "View"}Container`}>
                {books?.length > 0 ? (
                    books.map((book, index) => (
                        <div key={index}>
                            <BookItem book={book} index={index} view={viewType.toLowerCase() + "View"}/>
                        </div>
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
        </div>
    );
}

export default BookList;