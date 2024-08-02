import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CommonComponents.css"

function Footer() {
    return (
        <footer id="footer-areas " class="text-center text-white" style={{backgroundColor: "#0a4275"}}>


            <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                <section className="">
                    <p className="d-flex justify-content-center align-items-center">
                        <span className="me-3">Register for free</span>
                        <button data-mdb-ripple-init type="button" className="btn btn-outline-light btn-rounded">
                            Sign up!
                        </button>
                    </p>
                </section>
                © 2020 Copyright:
                <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>

        </footer>
    );
}

export default Footer