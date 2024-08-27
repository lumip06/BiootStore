import '../App.css';

import '../styles/BookPage.css'

import React from "react";

import BookInfo from "../components/books/BookInfo";
import {useNavigate} from 'react-router-dom';
import Status from "../components/common/Status";
import {useBoundStore} from "../stores/BoundStore";


function BookPage() {
    const navigate = useNavigate();
    const { loadingBooks, errorBooks, setLoadingBooks, setErrorBooks } = useBoundStore();
    return (
        <Status loading={loadingBooks} error={errorBooks}>
        <div id="book-area" className="BookPage">


            <div className="container-button">
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
            </div>

            <div className="container">
                <BookInfo/>

            </div>


        </div>
        </Status>
    );
}


export default BookPage;
