
import './App.css';


import BookFilter from "./components/books/BookFilter";

import './styles/MainPage.css'
import BookList from "./components/books/BookList";
import React from "react";
function Home() {
    return (
        <div className="Home">

            <div class=" row row  ">

                <div><h1 style={{padding:"100px"}}>Welcome to BiootStore!</h1></div>

                <div  id="content-area" >

                    <div class="col">
                        <BookFilter/>
                    </div>
                    <div id="books-area">
                        <BookList/>
                    </div>
                </div></div>





        </div>
    );
}


export default Home;
