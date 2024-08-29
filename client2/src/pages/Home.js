import '../App.css';
import BookFilter from "../components/books/BookFilter";
import './../styles/Home.css'
import '../styles/MainPage.css'
import BookList from "../components/books/BookList";
import React from "react";
import BookPagination from "../components/books/BookPagination";


class Home extends React.Component {


    render() {

        return <div className="Home" >

            <h1 className="h1Home">Welcome to BiootStore!</h1>

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
