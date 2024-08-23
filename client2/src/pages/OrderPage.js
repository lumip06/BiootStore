import {useLocation, useNavigate} from "react-router-dom";

import React from "react";
import OrderDetails from "../components/orders/OrderDetails";
import '../styles/OrderPage.css'
function OrderPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;
    return (
        <div id="order-area" >


            <div className="container-button">
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
            </div>

            <div className="container">
                {order ? (
                    <OrderDetails order={order}/>
                ) : (
                    <p>Loading order details...</p>
                )}
            </div>


        </div>
    );
}


export default OrderPage;