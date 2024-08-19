import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/CommonComponents.css"

import 'react-responsive-modal/styles.css';
import UserActions from "./UserActions";


function AppNavbar() {

    return (
        <header id="header-areas">
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">

                    <a className="navbar-brand mr-auto" href="/" style={{fontSize: '50px'}}>BiootStore</a>


                    <UserActions/>

                </div>
            </nav>

        </header>

    );
}

export default AppNavbar
