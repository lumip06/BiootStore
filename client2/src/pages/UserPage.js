import {useNavigate} from "react-router-dom";

import React, {useEffect, useState} from "react";
import {useBoundStore} from "../stores/BoundStore";
import '../styles/UserPage.css'
import {getBookFilters} from "../api/BookAPI";
import {getOrdersForUser} from "../api/OrderAPI";
import OrderList from "../components/orders/OrderList";
import {useFetchRequest} from "../api/CustomHook";
const serverUrl = process.env.REACT_APP_SERVER_URL;

function UserPage() {
    const { loggedInUser } = useBoundStore();
    const [userOrders, setUserOrders] = useState([]);
    const { apiCall, loading, error } = useFetchRequest();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserOrders = () => {
            if (loggedInUser.userId) {
                apiCall(
                    `${serverUrl}orders/user/${loggedInUser.userId}`, // API URL
                    'GET', // HTTP method
                    null, // No body for GET request
                    [
                        (data) => {
                            console.log(data); // Log the fetched data
                            setUserOrders(data); // Set the user orders
                        }
                    ], // Success callback
                    [console.error] // Error callback
                );
            }
        };

        fetchUserOrders();
    }, [loggedInUser.userId]);

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
                    {userOrders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <OrderList userOrders={userOrders} />
                    )}
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
