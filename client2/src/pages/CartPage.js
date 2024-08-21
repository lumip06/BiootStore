import '../App.css';

import '../styles/CartPage.css'

import React from "react";


import {useNavigate} from 'react-router-dom';
import OrderInfo from "../components/orders/OrderInfo";

function CartPage() {
    const navigate = useNavigate();
    return (
        <div className="CartPage">

            <div id="book-area">
                <div style={{display: 'flex', justifyContent: 'flex-start', padding: '15px', marginRight: '150px'}}>
                    <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
                </div>

                <div className="container">

                    <OrderInfo/>

                </div>

            </div>


        </div>
    );
}


export default CartPage;
