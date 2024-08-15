import React from "react";


function OrderRow({order}){


    return (
        <tr key={order._id}>
            <td>{order.userId}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>
                <ul>
                    {order.items.map((item) => (
                        <li key={item.bookId}>
                            Book ID: {item.bookId}, Quantity: {item.quantity}, Price: {item.price}
                        </li>
                    ))}
                </ul>
            </td>
            <td>
                {order.items.reduce((total, item) => total + item.price * item.quantity, 0)}
            </td>
        </tr>
    );
}

export default OrderRow;