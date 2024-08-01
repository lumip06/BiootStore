
import './App.css';
import BiootNavbar from "./components/BiootNavbar";
import Footer from "./components/Footer";
import BookFilter from "./components/BookFilter";
import BooksArea from "./components/BooksArea";
import RegisterForm from "./components/RegisterForm";
import './styles/RegisterPage.css'
function Register() {
    return (
        <div className="register">

            <div id="register-area">
                <div class="container">
            <div className=" row row  ">
                <BiootNavbar/>
                <RegisterForm/>
            </div>
                </div></div>

            <Footer/>
        </div>
    );
}


export default Register;
