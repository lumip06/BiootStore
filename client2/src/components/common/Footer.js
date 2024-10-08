import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/CommonComponents.css"
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer id="footer-areas " className="text-center text-white containerFooter" style={{backgroundColor: "#486e5c"}}>


            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                <section className="">
                    <p className="d-flex justify-content-center align-items-center">
                        <span className="me-3">Register for free</span>
                        <Link data-mdb-ripple-init to="/register" className="btn btn-outline-light btn-rounded"> Sign up!</Link>
                    </p>
                </section>
                © 2020 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>

        </footer>
    );
}

export default Footer