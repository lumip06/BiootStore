import '../App.css';

import '../styles/BookPage.css'

import React from "react";


import {useNavigate, useParams} from 'react-router-dom';
import Status from "../components/common/Status";
import {useBoundStore} from "../stores/BoundStore";
import BookItem from "../components/books/BookItem";


function BookPage() {
    const navigate = useNavigate();
    const { loadingBooks, errorBooks, setLoadingBooks, setErrorBooks } = useBoundStore();
    const { id } = useParams();
    return (
        <Status loading={loadingBooks} error={errorBooks}>
        <div id="book-area" className="BookPage">


            <div className="container-button">
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
            </div>

            <div className="container">
                {/*<BookInfo/>*/}
                <div className="bookDetails">
                <BookItem id={id} view={ "pageView"}/>
                </div>

            </div>


        </div>
        </Status>
    );
}


export default BookPage;
