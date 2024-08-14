import React from "react";


function OrderList({userOrders}) {


    return (
        <table border="1" cellPadding={20}>
            <thead>
            <tr>
                <th>User ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Price</th>
            </tr>
            </thead>
            <tbody>
            {userOrders.length > 0 ? (
                userOrders.map((order) => (
                    <tr key={order._id}>
                        <td>{order.userId}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        Book ID: {item.bookId}, Quantity: {item.quantity},
                                        Price: {item.price}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            {order.items.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </td>
                    </tr>
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
