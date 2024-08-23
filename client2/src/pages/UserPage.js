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
            <div className="button-container">
                <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-lg"> goBack</button>

            </div>

            <div className="userDetails">
                <h1 className="userPageH1">{loggedInUser.username}'s page</h1>

                <div className="col1">
                    <p>ORDERS: </p>
                    <Status loading={loading} error={error}/>
                    <OrderList userOrders={userOrders}/>

                </div>
                <div className="col2">
                    <h1><span>Username:&nbsp; </span> {loggedInUser.username}</h1>
                    <h1><span>Email:&nbsp; </span> {loggedInUser.email}</h1>
                    <h1><span>Role:&nbsp; </span> {loggedInUser.role}</h1>
                </div>
            </div>


        </div>
    );
}


export default UserPage;
