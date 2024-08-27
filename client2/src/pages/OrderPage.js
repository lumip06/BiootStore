import {useLocation, useNavigate} from "react-router-dom";

import React from "react";
import OrderDetails from "../components/orders/OrderDetails";
import '../styles/OrderPage.css'
import {useBoundStore} from "../stores/BoundStore";
import Status from "../components/common/Status";
function OrderPage() {
    const { loadingOrders,errorOrders } = useBoundStore();

    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;
    return (
        <div id="order-area" >


            <div className="container-button">
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
            </div>

            <div className="container">
                <Status loading={loadingOrders} error={errorOrders}>
                {order ? (
                    <OrderDetails order={order}/>
                ) : (
                    <p>Loading order details...</p>
                )}
                </Status>
            </div>


        </div>
    );
}


export default OrderPage;