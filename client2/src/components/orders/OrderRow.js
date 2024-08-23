import React from "react";
import {Link} from "react-router-dom";
import "./../../styles/OrderRow.css"

function OrderRow({order}){
    // const bookQuantities = order.items.reduce((acc, item) => {
    //     acc[item.bookId] = item.quantity;
    //     return acc;
    // }, {});

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
            {/*<td>*/}
            {/*    /!*<Link to={`/orders/${order._id}`} style={{textDecoration: 'none',color: "#000000"}}  state={{ order }}>*!/*/}
            {/*    /!*    ${calculateTotalPrice(bookQuantities, bookInfos).toFixed(2)}</Link>*!/*/}
            {/*</td>*/}

        </tr>

    );
}

export default OrderRow;