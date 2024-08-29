import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login"
import Register from "./pages/Register";
import AppNavbar from "./components/common/AppNavbar";
import React from "react";
import Footer from "./components/common/Footer";
import BookPage from "./pages/BookPage";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import UserPage from "./pages/UserPage";
import NewBookForm from "./components/books/NewBookForm";
import OrderPage from "./pages/OrderPage";

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
                    <Route path="/orders/:id" element={<OrderPage/>}/>
                    <Route path="/user" element={<UserPage/>}/>
                    <Route path="/book" element={<NewBookForm/>}/>
                </Routes>
                <Footer/>
            </Router>


        </div>
    );
}


export default App;
