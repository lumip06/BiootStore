import '../App.css';

import '../styles/BookPage.css'

import React from "react";

import BookInfo from "../components/books/BookInfo";
import {useNavigate} from 'react-router-dom';


function BookPage() {
    const navigate = useNavigate();

    return (
        <div id="book-area" className="BookPage">


            <div className="container-button">
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
            </div>

            <div className="container">
                <BookInfo/>

            </div>


        </div>
    );
}


export default BookPage;
