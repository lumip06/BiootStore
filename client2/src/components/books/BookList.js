import React, {useEffect, useState} from 'react';

import BookItem from './BookItem';
import {useBoundStore} from "../../BoundStore";


function BookList() {
    

    const {filters,books,fetchBooks}=useBoundStore();
    const [isButtonCardDisabled, setIsButtonCardDisabled] = useState(true);
    const [isButtonListDisabled, setIsButtonListDisabled] = useState(false);

    const handleClick = () => {
        setIsButtonCardDisabled(!isButtonCardDisabled);
        setIsButtonListDisabled(!isButtonListDisabled);
    };

    // Fetch books whenever the filters change
    useEffect(() => {
        console.log("Filters changed, fetching books:", filters);

        fetchBooks();
    }, [filters]); // Fetch books whenever filters change

    useEffect(() => {
        console.log("Books updated:", books);
        fetchBooks();
    }, []);
    // console.log(books);

    return (
        <div className="container-fluid">
            <div id="viewChanger">
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px'}}>
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