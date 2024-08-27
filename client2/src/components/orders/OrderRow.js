import React from "react";
import {Link} from "react-router-dom";
import "./../../styles/OrderRow.css"

function OrderRow({order}){


    return (

        <tr key={order._id}>

            <td> <Link to={`/orders/${order._id}`} className="link-style"   state={{ order }}>
                {order.userId}</Link></td>
            <td> <Link to={`/orders/${order._id}`} className="link-style"  state={{ order }}>
                {new Date(order.date).toLocaleDateString()}</Link></td>
            <td>
                <ul>
                    <Link to={`/orders/${order._id}`} className="link-style"  state={{ order }}>
                    {order.items.map((item) => (
                        <li key={item.bookId}>
                            Book ID: {item.bookId}, Quantity: {item.quantity}
                        </li>
                    ))}
                    </Link>
                </ul>
            </td>


        </tr>

    );
}

export default OrderRow;