import React, {useState} from "react";
import {useBoundStore} from "../../stores/BoundStore";
import {placeOrder} from "../../api/OrderAPI";
import {Modal} from "react-responsive-modal";
import {Navigate} from "react-router-dom";
import {calculateTotalPrice} from './CartUtils.js';

function OrderPlacement({bookInfos}) {

    const {cartBooks, emptyBookCart} = useBoundStore();
    const [open, setOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const totalPrice = calculateTotalPrice(cartBooks, bookInfos);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const handleCloseModal = () => {
        onCloseModal();
        setOrderPlaced(true);
    };


    if (orderPlaced) {
        return <Navigate to="/" replace/>;
    }

    return (
        <div style={{marginTop: "20px", textAlign: "right", padding: "50px"}}>
            <h1>TOTAL: {totalPrice} </h1>
            <button onClick={() => {
                placeOrder(cartBooks, bookInfos);
                emptyBookCart();
                onOpenModal()

            }} className="btn btn-outline-dark btn-lg">Order books
            </button>
            <Modal open={open} onClose={handleCloseModal} center>
                <div>
                    <h1>Order placed successfully! :D</h1>
                </div>
            </Modal>

        </div>
    );
}

export default OrderPlacement;