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



            {!loggedInUser && (
                <div>
                <Link to="/register" className="btn btn-outline-light btn-lg">Register</Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
                </div>
            )}

            {loggedInUser && (
               <div>
                <Link to="/" className="btn btn-outline-light btn-lg" onClick={handleLogout}>
                    Logout
                </Link>
                <Link to="/user" className="btn btn-outline-light btn-lg">
                    Profile
                </Link>
               </div>
            )}

            <div style={{marginLeft: "20px"}}>
                <div className="button-container">
                    <button onClick={onOpenCartModal} className="btn btn-outline-light btn-lg">
                        Cart
                    </button>
                    {numberOfCartBooks > 0 && <span className="badge">{numberOfCartBooks}</span>}
                </div>

                <Modal open={open} onClose={onCloseCartModal} center>
                    <CartModal onCloseModal={onCloseCartModal}/>
                </Modal>
            </div>


        </div>
    );

}

export default UserActions