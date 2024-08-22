import React from "react";
import {Link} from "react-router-dom";


function OrderRow({order}){


    return (

        <tr key={order._id}>

            <td> <Link to={`/orders/${order._id}`} style={{textDecoration: 'none' ,color: "#000000"}}  state={{ order }}>
                {order.userId}</Link></td>
            <td> <Link to={`/orders/${order._id}`} style={{textDecoration: 'none' ,color: "#000000"}}  state={{ order }}>
                {new Date(order.date).toLocaleDateString()}</Link></td>
            <td>
                <ul>
                    <Link to={`/orders/${order._id}`} style={{textDecoration: 'none',color: "#000000"}}  state={{ order }}>
                    {order.items.map((item) => (
                        <li key={item.bookId}>
                            Book ID: {item.bookId}, Quantity: {item.quantity}
                        </li>
                    ))}
                    </Link>
                </ul>
            </td>
            <td>
                <Link to={`/orders/${order._id}`} style={{textDecoration: 'none',color: "#000000"}}  state={{ order }}>
                    {order.items.reduce((total, item) => total + item.price * item.quantity, 0)}</Link>
            </td>

        </tr>

    );
}

export default OrderRow;