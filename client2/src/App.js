
import './App.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "../src/Login"
import Home from "./Home";
import Register from "./Register";
import BiootNavbar from "./components/BiootNavbar";

import React from "react";
import Footer from "./components/Footer";
import BookPage from "./BookPage";
function App() {
  return (

    <div className="App">


        <Router>
            <BiootNavbar/>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/books/:id" element={<BookPage />} />

            </Routes>
            <Footer/>
        </Router>


    </div>
  );
}


export default App;
