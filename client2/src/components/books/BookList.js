import React, {useEffect, useState} from 'react';

import BookItem from './BookItem';
import {useBoundStore} from "../../stores/BoundStore";
import Counters from "./Counters";
import {Link} from "react-router-dom";
import "./../../styles/BookList.css"
import Status from "../common/Status";

function BookList() {
    const { loadingBooks, errorBooks } = useBoundStore();
    const {filters, books, fetchBooks, limit, page,getRole} = useBoundStore();
    const [viewType, setViewType] = useState('card');

    useEffect(() => {
        fetchBooks();
    }, [filters, limit, page]);


    return (

        <div className="container-fluid">
            <div id="viewChanger">

                <Counters/>

                {(getRole() ==="admin")&&(
                    <div className="bookListButtons">
                        <Link to="/book" id="buttonNewBook" className="btn btn-outline-dark">
                            Add new book
                        </Link>
                    </div>
                )}

                <div className="bookListButtons">
                    <button
                        id="buttoncard"
                        className="btn btn-outline-dark"
                        disabled={viewType === "card"}
                        onClick={() => setViewType("card")}>
                        CardView
                    </button>
                    <button
                        id="buttonlist"
                        className="btn btn-outline-dark"
                        disabled={viewType === "list"}
                        onClick={() => setViewType("list")}>
                        ListView
                    </button>
                </div>
            </div>

            <div className={`${viewType + "View"}Container`}>
                {books?.length > 0 ? (
                    books.map((book, index) => (
                        <div key={index}>
                            <BookItem  id={book._id} view={viewType.toLowerCase() + "View"}/>
                        </div>
                    ))
                ) : (
                    <Status loading={loadingBooks} error={errorBooks}>
                    <p>No books available.</p>
                    </Status>
                )}
            </div>
        </div>

    );
}

export default BookList;