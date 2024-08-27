import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/CommonComponents.css"
import {Link, useNavigate} from "react-router-dom";
import {Modal} from "react-responsive-modal";
import CartModal from "../orders/CartModal";
import {countBooksInCart} from "../orders/CartUtils";
import {useBoundStore} from "../../stores/BoundStore";

function UserActions() {
    const {cartBooks, loggedInUser, logoutUser,getRole} = useBoundStore()
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


                        <svg viewBox="0 0 1024 1024" className="icon" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" fill="#000000" height="50px" width="50px">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M645.3 656.8c12.6-2.7 21.4-13.6 22.5-26.1h0.1c0.6-6.7 1.7-13.3 3.3-19.8h-0.2c1.3-4.6 1.5-9.6 0.4-14.7-3.5-16.2-19.1-26.5-34.7-23.1-11.9 2.6-20.5 12.4-22.3 24.1-0.1 0.7-0.2 1.3-0.4 2-1.7 7.5-3 15.2-3.7 23-0.6 3.7-0.5 7.6 0.3 11.6 3.5 16.1 19 26.4 34.7 23zM513 753.6c-86.7 0-157.2-70.5-157.2-157.2 0-15.9 2.4-31.5 7-46.5 4.9-15.8 21.7-24.7 37.5-19.8 15.8 4.9 24.7 21.7 19.8 37.5-2.9 9.3-4.3 19-4.3 28.8 0 53.6 43.6 97.2 97.2 97.2 19.5 0 38.3-5.7 54.3-16.6 13.7-9.3 32.4-5.7 41.7 8.1 9.3 13.7 5.7 32.4-8.1 41.7-26 17.5-56.4 26.8-87.9 26.8z"
                                    fill="#33CC99"></path>
                                <path d="M576.1 303.4m-175.4 0a175.4 175.4 0 1 0 350.8 0 175.4 175.4 0 1 0-350.8 0Z"
                                      fill="#FFB89A"></path>
                                <path
                                    d="M513 121.4c39.7 0 77.1 15.5 105.1 43.5 28.1 28.1 43.5 65.4 43.5 105.1s-15.5 77.1-43.5 105.1c-28.1 28.1-65.4 43.5-105.1 43.5-39.7 0-77.1-15.5-105.1-43.5-28.1-28.1-43.5-65.4-43.5-105.1s15.5-77.1 43.5-105.1 65.4-43.5 105.1-43.5m0-60c-115.3 0-208.7 93.4-208.7 208.7S397.7 478.8 513 478.8c115.3 0 208.7-93.4 208.7-208.7S628.3 61.4 513 61.4z"
                                    fill="#468b74"></path>
                                <path
                                    d="M512.3 573.2c44.4 0 88.3 7.5 130.6 22.3 38.5 13.5 75.2 33.1 106.2 56.8 28.8 22 52.4 47.2 68.2 72.8 14 22.6 21.4 44.6 21.4 63.6 0 15.2-4.7 27.2-15.1 38.9-12.6 14.1-32.8 26.6-60 37.3-58.9 23.1-145.8 35.3-251.3 35.3S319.9 888 261 864.9c-27.2-10.7-47.4-23.2-60-37.3-10.4-11.7-15.1-23.7-15.1-38.9 0-19 7.4-40.9 21.4-63.6 15.9-25.6 39.5-50.8 68.2-72.8 31-23.7 67.7-43.3 106.2-56.8 42.4-14.8 86.3-22.3 130.6-22.3m0-60c-213.4 0-386.4 152.1-386.4 275.5s173 171.5 386.4 171.5 386.4-48.1 386.4-171.5-172.9-275.5-386.4-275.5z"
                                    fill="#468b74"></path>
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


            {(getRole() === "client" || !loggedInUser) && (
                <div style={{marginLeft: "20px"}}>
                    <div className="button-container-nav">
                        <button onClick={onOpenCartModal} className="btn btn-outline-light btn-lg">


                            <svg viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 fill="#000000" height="50px" width="50px">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M845.4 383H758c-16.6 0-30-13.4-30-30s13.4-30 30-30h87.4c16.6 0 30 13.4 30 30s-13.5 30-30 30zM662.3 383H263.1c-16.6 0-30-13.4-30-30s13.4-30 30-30h399.2c16.6 0 30 13.4 30 30s-13.5 30-30 30z"
                                        fill="#476259"></path>
                                    <path d="M433.2 873.2m-55 0a55 55 0 1 0 110 0 55 55 0 1 0-110 0Z"
                                          fill="#FFB89A"></path>
                                    <path d="M854.5 873.2m-55 0a55 55 0 1 0 110 0 55 55 0 1 0-110 0Z"
                                          fill="#FFB89A"></path>
                                    <path
                                        d="M889.8 722.1h-511c-37.7 0-68.4-30.7-68.4-68.4v-1.4L274.5 270v-0.2-0.2l-6-55.4c-8.6-86.8-57.6-117.5-97.3-128.1L101.5 69c-16.1-4-32.3 5.9-36.3 22s5.9 32.3 22 36.3l68.9 16.9c16.2 4.3 28.1 12.4 36.6 24.7 8.6 12.4 14 29.7 16.1 51.4l6 55.6 35.6 379.3c0.8 70.1 58.1 126.9 128.4 126.9h511c16.6 0 30-13.4 30-30s-13.4-30-30-30z"
                                        fill="#33cc99"></path>
                                    <path
                                        d="M840.3 197.8H381c-16.6 0-30 13.4-30 30s13.4 30 30 30h459.3c30.2 0 54.9 24.3 55.5 54.3l-19.9 226.5-0.1 1.3v1.3c0 30.6-24.9 55.5-55.5 55.5H436c-16.6 0-30 13.4-30 30s13.4 30 30 30h384.3c63.2 0 114.7-51.1 115.5-114.1L955.7 316l0.1-1.3v-1.3c0-63.8-51.8-115.6-115.5-115.6z"
                                        fill="#33cc99"></path>
                                    <path
                                        d="M408.5 842.1c7.2 0 13.1 5.9 13.1 13.1s-5.9 13.1-13.1 13.1-13.1-5.9-13.1-13.1 5.9-13.1 13.1-13.1m0-60c-40.4 0-73.1 32.7-73.1 73.1s32.7 73.1 73.1 73.1 73.1-32.7 73.1-73.1-32.7-73.1-73.1-73.1zM823.1 842.1c7.2 0 13.1 5.9 13.1 13.1s-5.9 13.1-13.1 13.1-13.1-5.9-13.1-13.1 5.9-13.1 13.1-13.1m0-60c-40.4 0-73.1 32.7-73.1 73.1s32.7 73.1 73.1 73.1 73.1-32.7 73.1-73.1-32.7-73.1-73.1-73.1z"
                                        fill="#33cc99"></path>
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