import '../App.css';


import BookFilter from "../components/books/BookFilter";

import '../styles/MainPage.css'
import BookList from "../components/books/BookList";

import React from "react";
import BookPagination from "../components/books/BookPagination";


class Home extends React.Component {


    render() {

        return <div className="Home">

            <div className=" row  ">

                <div><h1 style={{paddingTop: "150px"}}>Welcome to BiootStore!</h1></div>

                <div id="content-area">

                    <div className="col">
                        <BookFilter/>

                    </div>
                    <div id="books-area">

                        <BookList/>
                        <BookPagination/>

                    </div>

                </div>
            </div>


        </div>
    }
}


export default Home;
