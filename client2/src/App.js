import './App.css';


import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from "./pages/Login"

import Register from "./pages/Register";
import AppNavbar from "./components/AppNavbar";

import React from "react";
import Footer from "./components/Footer";
import BookPage from "./pages/BookPage";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";

function App() {

    return (

        <div className="App">


            <Router>
                <AppNavbar/>
                <Routes>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/books/:id" element={<BookPage/>}/>
                    <Route path="/orders" element={<CartPage/>}/>

                </Routes>
                <Footer/>
            </Router>


        </div>
    );
}


export default App;
