import {useNavigate} from "react-router-dom";

import React from "react";
import {useBoundStore} from "../stores/BoundStore";
import '../styles/UserPage.css'

function UserPage() {

    const {loggedInUser}=useBoundStore();
    return (
        <div className="userPage">

            <div className="userDetails">
                <div className="col1">
                    <p>ORDERS: </p>

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
