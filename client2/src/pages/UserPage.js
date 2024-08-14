import {useNavigate} from "react-router-dom";

import React, {useEffect, useState} from "react";
import {useBoundStore} from "../stores/BoundStore";
import '../styles/UserPage.css'
import {getBookFilters} from "../api/BookAPI";
import {getOrdersForUser} from "../api/OrderAPI";

function UserPage() {
    const navigate = useNavigate();
    const {loggedInUser}=useBoundStore();
    const [userOrders,setUserOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserOrders = async () => {
            setLoading(true);
            try {
                const data = await getOrdersForUser(loggedInUser.userId);
                console.log(data);
                setUserOrders(data);

            } catch (err) {

                setError(err);

            } finally {

                setLoading(false);

            }

        };

        fetchUserOrders();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="userPage">
            <div style={{display: 'flex', justifyContent: 'flex-start', padding: '15px'}}>
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
            </div>
            <div className="userDetails">
                <div className="col1">
                    <p>ORDERS: </p>
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
                </div>
                <div className="col2">
                    <h1>Username:{loggedInUser.username}</h1>
                    <h1>Email:{loggedInUser.email}</h1>

                </div>
            </div>


        </div>
    );
}


export default UserPage;
