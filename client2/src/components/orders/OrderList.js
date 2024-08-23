import React from "react";
import OrderRow from "./OrderRow";


function OrderList({userOrders}) {


    return (
        <table border="1" cellPadding={20}>
            <thead >
            <tr>
                <th>User ID</th>
                <th>Date</th>
                <th>Items</th>

            </tr>
            </thead>
            <tbody>
            {userOrders.length > 0 ? (
                userOrders.map((order) => (
                    <OrderRow key={order._id} order={order}/>
                ))
            ) : (
                <tr>
                    <td colSpan="4">No orders found</td>
                </tr>
            )}
            </tbody>
        </table>
    );
}


export default OrderList;
