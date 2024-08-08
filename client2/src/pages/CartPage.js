import {useNavigate} from "react-router-dom";
import BookInfo from "../components/books/BookInfo";
import React from "react";

function CartPage() {
    const navigate = useNavigate();
    return (
        <div className="CartPage">

            <div id="cart-area">
                <div style={{display: 'flex', justifyContent: 'flex-start', padding: '15px', marginRight: '150px'}}>
                    <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
                </div>

                <div className="container">



                </div>

            </div>


        </div>
    );
}


export default CartPage;
