import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/CommonComponents.css"
import {Link, useNavigate} from "react-router-dom";
import {Modal} from "react-responsive-modal";
import CartModal from "../orders/CartModal";
import {countBooksInCart} from "../orders/CartUtils";
import {useBoundStore} from "../../stores/BoundStore";

function UserActions() {
    const {cartBooks, loggedInUser, logoutUser} = useBoundStore()
    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    const [open, setOpen] = useState(false);
    const onOpenCartModal = () => setOpen(true);
    const onCloseCartModal = () => setOpen(false);
    const [numberOfCartBooks, setNumberOfCartBooks] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        setNumberOfCartBooks(countBooksInCart(cartBooks));
    }, [cartBooks]);

    return (
        <div id="user-space" className="btn-group btn-group-lg" role="group"
             aria-label="Large button group">

            {loggedInUser && (
                <div>
                    <Link to="/" className="btn btn-outline-light btn-lg" onClick={handleLogout}>
                        Logout
                    </Link>
                    <Link to="/user" className="btn btn-outline-light btn-lg">

                        <svg viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             fill="#000000" height="20px" width="30px">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M645.3 656.8c12.6-2.7 21.4-13.6 22.5-26.1h0.1c0.6-6.7 1.7-13.3 3.3-19.8h-0.2c1.3-4.6 1.5-9.6 0.4-14.7-3.5-16.2-19.1-26.5-34.7-23.1-11.9 2.6-20.5 12.4-22.3 24.1-0.1 0.7-0.2 1.3-0.4 2-1.7 7.5-3 15.2-3.7 23-0.6 3.7-0.5 7.6 0.3 11.6 3.5 16.1 19 26.4 34.7 23zM513 753.6c-86.7 0-157.2-70.5-157.2-157.2 0-15.9 2.4-31.5 7-46.5 4.9-15.8 21.7-24.7 37.5-19.8 15.8 4.9 24.7 21.7 19.8 37.5-2.9 9.3-4.3 19-4.3 28.8 0 53.6 43.6 97.2 97.2 97.2 19.5 0 38.3-5.7 54.3-16.6 13.7-9.3 32.4-5.7 41.7 8.1 9.3 13.7 5.7 32.4-8.1 41.7-26 17.5-56.4 26.8-87.9 26.8z"
                                    fill="#33CC99"></path>
                                <path d="M576.1 303.4m-175.4 0a175.4 175.4 0 1 0 350.8 0 175.4 175.4 0 1 0-350.8 0Z"
                                      fill="#FFB89A"></path>
                                <path
                                    d="M513 121.4c39.7 0 77.1 15.5 105.1 43.5 28.1 28.1 43.5 65.4 43.5 105.1s-15.5 77.1-43.5 105.1c-28.1 28.1-65.4 43.5-105.1 43.5-39.7 0-77.1-15.5-105.1-43.5-28.1-28.1-43.5-65.4-43.5-105.1s15.5-77.1 43.5-105.1 65.4-43.5 105.1-43.5m0-60c-115.3 0-208.7 93.4-208.7 208.7S397.7 478.8 513 478.8c115.3 0 208.7-93.4 208.7-208.7S628.3 61.4 513 61.4z"
                                    fill="#d4d8de"></path>
                                <path
                                    d="M512.3 573.2c44.4 0 88.3 7.5 130.6 22.3 38.5 13.5 75.2 33.1 106.2 56.8 28.8 22 52.4 47.2 68.2 72.8 14 22.6 21.4 44.6 21.4 63.6 0 15.2-4.7 27.2-15.1 38.9-12.6 14.1-32.8 26.6-60 37.3-58.9 23.1-145.8 35.3-251.3 35.3S319.9 888 261 864.9c-27.2-10.7-47.4-23.2-60-37.3-10.4-11.7-15.1-23.7-15.1-38.9 0-19 7.4-40.9 21.4-63.6 15.9-25.6 39.5-50.8 68.2-72.8 31-23.7 67.7-43.3 106.2-56.8 42.4-14.8 86.3-22.3 130.6-22.3m0-60c-213.4 0-386.4 152.1-386.4 275.5s173 171.5 386.4 171.5 386.4-48.1 386.4-171.5-172.9-275.5-386.4-275.5z"
                                    fill="#d4d8de"></path>
                            </g>
                        </svg>
                    </Link>
                </div>
            )}

            {!loggedInUser && (
                <div>
                    <Link to="/register" className="btn btn-outline-light btn-lg">Register</Link>
                    <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
                </div>
            )}


            {(loggedInUser?.role === "client" || !loggedInUser) && (
                <div style={{marginLeft: "20px"}}>
                    <div className="button-container">
                        <button onClick={onOpenCartModal} className="btn btn-outline-light btn-lg">

                            <svg viewBox="0 0 1024 1024" className="icon" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" fill="#000000" height="20px" width="50px">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M687.7 833.8h-76.8c-16.6 0-30-13.4-30-30s13.4-30 30-30h76.8c16.6 0 30 13.4 30 30s-13.4 30-30 30zM480.7 833.8H136.8c-16.6 0-30-13.4-30-30s13.4-30 30-30h343.9c16.6 0 30 13.4 30 30s-13.4 30-30 30z"
                                        fill="#33CC99"></path>
                                    <path
                                        d="M880.8 931H207.9c-25.3 0-45.9-20.7-45.9-45.9 0-25.3 20.7-45.9 45.9-45.9h672.9c25.3 0 45.9 20.7 45.9 45.9S906 931 880.8 931z"
                                        fill="#FFB89A"></path>
                                    <path
                                        d="M703 122.7c20.9 0 40.6 8.2 55.5 23.2 14.9 14.9 23.2 34.7 23.2 55.5v2.8l0.3 2.8 57.7 611.8c-0.6 20-8.8 38.7-23.1 53.1-14.9 14.9-34.7 23.2-55.5 23.2H236c-20.9 0-40.6-8.2-55.5-23.2-14.4-14.4-22.6-33.2-23.1-53.2l54.7-612 0.2-2.7v-2.7c0-20.9 8.2-40.6 23.2-55.5 14.9-14.9 34.7-23.2 55.5-23.2h412m0-59.9H291c-76.3 0-138.7 62.4-138.7 138.7l-55 615c0 76.3 62.4 138.7 138.7 138.7h525c76.3 0 138.7-62.4 138.7-138.7l-58-615c0-76.3-62.4-138.7-138.7-138.7z"
                                        fill="#d7dde5"></path>
                                    <path
                                        d="M712.6 228.8c0-24.9-20.1-45-45-45s-45 20.1-45 45c0 13.5 6 25.6 15.4 33.9-0.3 1.6-0.4 3.3-0.4 5v95.9c0 23.5-9.2 45.7-26 62.5-16.8 16.8-39 26-62.5 26h-88.5c-23.5 0-45.7-9.2-62.5-26-16.8-16.8-26-39-26-62.5v-95.9c0-1.7-0.1-3.4-0.4-5 9.4-8.2 15.4-20.4 15.4-33.9 0-24.9-20.1-45-45-45s-45 20.1-45 45c0 13.5 6 25.6 15.4 33.9-0.3 1.6-0.4 3.3-0.4 5v95.9c0 81.9 66.6 148.6 148.6 148.6h88.5c81.9 0 148.6-66.6 148.6-148.6v-95.9c0-1.7-0.1-3.4-0.4-5 9.3-8.3 15.2-20.4 15.2-33.9z"
                                        fill="#d7dde5"></path>
                                </g>
                            </svg>
                        </button>
                        {numberOfCartBooks > 0 && <span className="badge">{numberOfCartBooks}</span>}
                    </div>

                    <Modal open={open} style={{backgroundColor: "#523744"}} onClose={onCloseCartModal} center>
                        <CartModal onCloseModal={onCloseCartModal}/>
                    </Modal>
                </div>
            )}

        </div>
    );

}

export default UserActions