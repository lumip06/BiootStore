import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


import {Link} from "react-router-dom";

import ReactDOM from 'react-dom';

import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CartModal from "./books/CartModal";
import {useBoundStore} from "../BoundStore";

function AppNavbar() {

    // const {cartBooks}=useBoundStore()
    // console.log(cartBooks)

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    return (
        <header id="header-areas">
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand mr-auto" href="/" style={{fontSize: '50px'}}>BiootStore</a>

                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar"
                         aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">BiootsStore</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">

                                <input className="form-control me-2 " type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-light" type="submit">Search</button>
                            </form>
                        </div>
                    </div>

                    <form className="d-flex" role="search">
                        <input className="form-control-lg me-2" type="search" placeholder="Search" aria-label="Search"
                               style={{width: '500px'}}/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>

                    <div id="user-space" className="btn-group btn-group-lg" role="group"
                         aria-label="Large button group">

                        <Link to="/register" className="btn btn-outline-light btn-lg">Register</Link>
                        <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>

                        <div>
                            <button onClick={onOpenModal} className="btn btn-outline-light btn-lg">Cart</button>
                            <Modal open={open} onClose={onCloseModal} center>

                                <CartModal onCloseModal={onCloseModal}/>
                            </Modal>
                        </div>


                    </div>
                </div>
            </nav>

        </header>

    );
}

export default AppNavbar
