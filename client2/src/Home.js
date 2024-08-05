import './App.css';


import BookFilter from "./components/books/BookFilter";

import './styles/MainPage.css'
import BookList from "./components/books/BookList";
import FilterCounter from "./components/books/FilterCounter"
import React from "react";
import BookPagination from "./components/books/BookPagination";
import ViewChanger from "./components/books/ViewChanger";

class Home extends React.Component {


    render() {

        return <div className="Home">

            <div className=" row row  ">

                <div><h1 style={{padding: "100px"}}>Welcome to BiootStore!</h1></div>

                <div id="content-area">

                    <div className="col">
                        <BookFilter/>

                    </div>
                    <div id="books-area">
                        <ViewChanger/>
                        <BookList />
                        <BookPagination/>

                    </div>
                    <FilterCounter />
                </div>
            </div>


        </div>
    }
}


export default Home;
