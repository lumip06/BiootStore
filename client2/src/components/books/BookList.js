import React, {useEffect, useState} from 'react';

import BookItem from './BookItem';
import {useBoundStore} from "../../BoundStore";


function BookList() {
    

    const {filters,books,fetchBooks,updateLimit,limit,page}=useBoundStore();
    const [isButtonCardDisabled, setIsButtonCardDisabled] = useState(true);
    const [isButtonListDisabled, setIsButtonListDisabled] = useState(false);

    const handleClick = () => {
        setIsButtonCardDisabled(!isButtonCardDisabled);
        setIsButtonListDisabled(!isButtonListDisabled);
    };

    // Fetch books whenever the filters change
    useEffect(() => {
        // console.log("Filters changed, fetching books:", filters);

        fetchBooks();
    }, [filters,limit,page]); // Fetch books whenever filters change


    return (
        <div className="container-fluid">
            <div id="viewChanger">
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px'}}>
                    <label htmlFor="pagelimit">Books per page:</label>
                    <input type="number" id="pagelimit" name="pagelimit" className="btn btn-outline-dark"
                           onChange={(e) => updateLimit(e.currentTarget.value)}
                           min="6" max="36" step="6" />
                    <button id="buttonCard" className="btn btn-outline-dark" disabled={isButtonCardDisabled}
                            onClick={handleClick}>CardView
                    </button>
                    <button id="buttonList" className="btn btn-outline-dark" disabled={isButtonListDisabled}
                            onClick={handleClick}>ListView
                    </button>
                </div>
            </div>


            <div className={`${(isButtonCardDisabled ? "cardView" : "listView ")}Container`}>
                {books && books.length > 0 ? (
                    books.map((book, index) => (
                        <div key={index}>
                            <BookItem book={book} index={index} view={isButtonCardDisabled ? "cardView" : "listView"} />
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