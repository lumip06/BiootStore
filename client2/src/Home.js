
import './App.css';


import BookFilter from "./components/books/BookFilter";

import './styles/MainPage.css'
import BookList from "./components/books/BookList";
import React from "react";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: []
        };
    }
    handleFilterChange = (name, value, checked) => {
        this.setState((prevState) => {
            let filters = { ...prevState.filters };
            if (!filters[name]) {
                filters[name] = [];
            }
            if(checked){

                filters[name].push("&"+name+"="+value);
            }
         else {
                filters[name] = filters[name].filter(item => item !== "&"+name+"="+value);
            }


            return {filters} ;
        });
    };
    render() {

       return <div className="Home">

            <div className=" row row  ">

                <div><h1 style={{padding:"100px"}}>Welcome to BiootStore!</h1></div>

                <div  id="content-area" >

                    <div className="col">
                        <BookFilter onFilterChange={this.handleFilterChange}/>
                    </div>
                    <div id="books-area">
                        <BookList filters={this.state.filters}/>
                    </div>
                </div></div>





        </div>
    }
}


export default Home;
