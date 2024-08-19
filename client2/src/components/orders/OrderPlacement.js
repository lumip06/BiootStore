import React, {useState} from "react";
import {useBoundStore} from "../../stores/BoundStore";
import {placeOrder} from "../../api/OrderAPI";
import {Modal} from "react-responsive-modal";
import {Navigate} from "react-router-dom";
import {calculateTotalPrice} from './CartUtils.js';
import {updateStock} from "../../api/BookAPI";

function OrderPlacement({bookInfos}) {

    const {cartBooks, emptyBookCart,loggedInUser} = useBoundStore();
    const [open, setOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const totalPrice = calculateTotalPrice(cartBooks, bookInfos);

    const onOpenOrderSuccessModal = () => setOpen(true);
    const onCloseOrderSuccessModal = () => setOpen(false);
    const handleCloseOrderSuccessModal = () => {
        onCloseOrderSuccessModal();
        setOrderPlaced(true);
    };
    const handleOrderClick = () => {

        placeOrder(cartBooks, bookInfos, loggedInUser);
        // updateStock(cartBooks);
        emptyBookCart();
        onOpenOrderSuccessModal();
    };

    if (orderPlaced) {
        return <Navigate to="/" replace/>;
    }

    return (
        <div style={{marginTop: "20px", textAlign: "right", padding: "50px"}}>
            <h1>TOTAL: {totalPrice} </h1>
            <button
                onClick={handleOrderClick}
                className="btn btn-outline-dark btn-lg"
                disabled={!loggedInUser}>
                Order books
            </button>
            {!loggedInUser && (
                <span style={{color: 'red', fontSize: 'small', marginTop: '5px', display: 'block'}}>
                    You need to be logged in to place an order.
                </span>
            )}
            <Modal open={open} onClose={handleCloseOrderSuccessModal} center>
                <div>
                    <h1>Order placed successfully! :D</h1>
                </div>
            </Modal>

        </div>
    );
}

export default OrderPlacement;