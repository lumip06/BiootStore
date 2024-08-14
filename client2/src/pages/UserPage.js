import {useNavigate} from "react-router-dom";

import React, {useEffect, useState} from "react";
import {useBoundStore} from "../stores/BoundStore";
import '../styles/UserPage.css'
import {getBookFilters} from "../api/BookAPI";
import {getOrdersForUser} from "../api/OrderAPI";
import OrderList from "../components/orders/OrderList";

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
