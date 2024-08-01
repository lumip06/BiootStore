
import './App.css';
import BiootNavbar from "./components/BiootNavbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";

import './styles/LoginPage.css'

function Login() {
    return (
        <div className="login">


            <div className=" row row  ">
                <BiootNavbar/>
                <div id="login-area">
                    <div class="container">
                       <LoginForm/>
                    </div>
                </div>
            </div>


            <Footer/>
        </div>
    );
}


export default Login;
