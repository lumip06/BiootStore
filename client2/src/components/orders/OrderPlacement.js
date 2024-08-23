import React, {useState} from "react";
import {useBoundStore} from "../../stores/BoundStore";
import {placeOrder} from "../../api/OrderAPI";
import {Modal} from "react-responsive-modal";
import {Navigate} from "react-router-dom";
import {calculateTotalPrice} from './CartUtils.js';
import "./../../styles/OrderPlacement.css"

function OrderPlacement({bookInfos}) {

    const {cartBooks, emptyBookCart,loggedInUser,updateSelectedBooksStock} = useBoundStore();
    const [open, setOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const totalPrice = calculateTotalPrice(cartBooks, bookInfos);

    const onOpenOrderSuccessModal = () => setOpen(true);
    const onCloseOrderSuccessModal = () => setOpen(false);
    const handleCloseOrderSuccessModal = () => {
        onCloseOrderSuccessModal();
        setOrderPlaced(true);
    };
    const handlePlaceOrder = () => {

        placeOrder(cartBooks);
        updateSelectedBooksStock( );
        emptyBookCart();
        onOpenOrderSuccessModal();
    };

    if (orderPlaced) {
        return <Navigate to="/" replace/>;
    }

    return (
        <div className="order-placement">
            <h1>TOTAL: ${totalPrice} </h1>
            <button
                onClick={handlePlaceOrder}
                className="btn btn-outline-dark btn-lg"
                disabled={!loggedInUser}>
                Order books
            </button>
            {!loggedInUser && (
                <span className="order-placement-span">
                    You need to be logged in to place an order.
                </span>
            )}
            <Modal open={open} onClose={handleCloseOrderSuccessModal} center>
                <div className="order-placement-div">
                    <h1>Order placed successfully! :D</h1>
                </div>
            </Modal>

        </div>
    );
}

export default OrderPlacement;