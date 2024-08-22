import {useNavigate} from "react-router-dom";

import React, {useEffect, useState} from "react";
import {useBoundStore} from "../stores/BoundStore";
import '../styles/UserPage.css'

import OrderList from "../components/orders/OrderList";
import {useFetchRequest} from "../api/CustomHook";
import Status from "../components/common/Status";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function UserPage() {
    const {loggedInUser, getToken} = useBoundStore();
    const [userOrders, setUserOrders] = useState([]);
    const {apiCall, loading, error} = useFetchRequest();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserOrders = () => {
            if (loggedInUser.userId) {

                apiCall(
                    `${serverUrl}orders/`,
                    'GET',
                    null,
                    [
                        (data) => {
                            console.log(data);
                            setUserOrders(data);
                        }
                    ],
                    [console.error]
                );


            }
        };

        fetchUserOrders();
    }, [loggedInUser.userId]);


    return (
        <div className="userPage">
            <div style={{display: 'flex', justifyContent: 'flex-start', padding: '15px'}}>
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>
            </div>
            <div className="userDetails">
                <div className="col1">
                    <p>ORDERS: </p>
                    <Status loading={loading} error={error}/>
                    <OrderList userOrders={userOrders}/>

                </div>
                <div className="col2">
                    <h1>Username:{loggedInUser.username}</h1>
                    <h1>Email:{loggedInUser.email}</h1>
                    <h1>Role:{loggedInUser.role}</h1>
                </div>
            </div>


        </div>
    );
}


export default UserPage;
