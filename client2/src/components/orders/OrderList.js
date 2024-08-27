import React from "react";
import OrderRow from "./OrderRow";
import {useBoundStore} from "../../stores/BoundStore";
import Status from "../common/Status";


function OrderList({userOrders}) {
    const { loadingOrders,errorOrders } = useBoundStore();


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
                    <Status loading={loadingOrders} error={errorOrders}>
                    <td colSpan="4">No orders found</td>
                    </Status>
                </tr>
            )}

            </tbody>
        </table>
    );
}


export default OrderList;
