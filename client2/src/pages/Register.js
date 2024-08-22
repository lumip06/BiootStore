import '../App.css';

import RegisterForm from "../components/users/RegisterForm";
import '../styles/RegisterPage.css'
import React from "react";

function Register() {
    return (
        <div className="register">

            <div id="register-area">
                <h1>REGISTER</h1>


                <div className="container">

                    <RegisterForm/>

                </div>
            </div>


        </div>
    );
}


export default Register;
