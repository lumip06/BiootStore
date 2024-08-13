import React, {useEffect, useState} from 'react';

import BookItem from './BookItem';
import {useBoundStore} from "../../stores/BoundStore";
import Counters from "./Counters";


function BookList() {


    const {filters, books, fetchBooks, limit, page} = useBoundStore();
    const [viewType, setViewType] = useState('card');




    useEffect(() => {

        fetchBooks();
    }, [filters, limit, page]);


    return (
        <div className="container-fluid">
            <div id="viewChanger" style={{display: 'flex'}}>
                <div style={{justifyContent: 'flex-start', padding: '15px', marginRight: '450px'}}>
                    <Counters/></div>
                <div style={{justifyContent: 'flex-end', padding: '15px'}}>
                    <button id="buttoncard" className="btn btn-outline-dark" disabled={viewType === "card"}
                            onClick={() => setViewType("card")}>CardView
                    </button>
                    <button id="buttonlist" className="btn btn-outline-dark"   disabled={viewType === "list"}
                            onClick={() => setViewType("list")}>ListView
                    </button>
                </div>
            </div>


            <div className={`${(viewType + "View")}Container`}>
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