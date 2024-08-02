
import './App.css';

import LoginForm from "./components/users/LoginForm";

import './styles/LoginPage.css'

function Login() {
    return (
        <div className="Login">


            <div className=" row  ">

                <div id="login-area">
                    <div class="container">
                       <LoginForm/>
                    </div>
                </div>
            </div>


        </div>
    );
}


export default Login;
