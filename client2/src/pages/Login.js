
import '../App.css';

import LoginForm from "../components/users/LoginForm";

import '../styles/LoginPage.css'
import React from "react";

function Login() {
    return (
        <div className="Login">


            <div id="login-area">
                <h1>LOGIN</h1>
                <div className="container">
                    <LoginForm/>
                </div>
            </div>


        </div>
    );
}


export default Login;
