
import '../App.css';

import '../styles/BookPage.css'

import React from "react";

import BookInfo from "../components/books/BookInfo";
import { useNavigate } from 'react-router-dom';
import Counters from "../components/books/Counters";

function BookPage() {
    const navigate = useNavigate();
    return (
        <div className="BookPage">

            <div id="book-area">
                <div className="container">
                    <div style={{display:'flex' ,justifyContent: 'flex-start', padding: '15px', marginRight: '150px'}}>
                        <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
                    </div>

                    <BookInfo/>
                </div>

            </div>


        </div>
    );
}


export default BookPage;
