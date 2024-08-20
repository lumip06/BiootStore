import '../App.css';


import BookFilter from "../components/books/BookFilter";

import '../styles/MainPage.css'
import BookList from "../components/books/BookList";

import React from "react";
import BookPagination from "../components/books/BookPagination";


class Home extends React.Component {


    render() {

        return <div className="Home" style={{backgroundColor: "#496F5D"}}>

            <h1 style={{paddingTop: "150px", color: "#C9D5B5"}}>Welcome to BiootStore!</h1>

            <div id="content-area">


                <BookFilter/>


                <div id="books-area">

                    <BookList/>
                    <BookPagination/>

                </div>

            </div>


        </div>
    }
}


export default Home;
