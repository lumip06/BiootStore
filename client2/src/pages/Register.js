
import '../App.css';

import RegisterForm from "../components/users/RegisterForm";
import '../styles/RegisterPage.css'
function Register() {
    return (
        <div className="register">

            <div id="register-area">
                <div className="container">
            <div className=" row row  ">

                <RegisterForm/>
            </div>
                </div></div>


        </div>
    );
}


export default Register;
