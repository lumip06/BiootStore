
import '../App.css';

import '../styles/BookPage.css'

import React from "react";

import BookInfo from "../components/books/BookInfo";
function BookPage() {
    return (
        <div className="BookPage">

            <div id="book-area">
                <div className="container">
                    <BookInfo />
                </div>

            </div>


        </div>
    );
}


export default BookPage;
