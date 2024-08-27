import React, {useState} from "react";
import {useBoundStore} from "../../stores/BoundStore";
import {Modal} from "react-responsive-modal";
import {Navigate} from "react-router-dom";
import {calculateTotalPrice, processBooksData} from './CartUtils.js';
import "./../../styles/OrderPlacement.css"
import {createOrderItems} from "../../api/APIUtils";
import {useFetchRequest} from "../../api/CustomHook";
import Status from "../common/Status";
const serverUrl = process.env.REACT_APP_SERVER_URL;

function OrderPlacement({bookInfos}) {
    const { loadingOrders,errorOrders,setLoadingOrders,setErrorOrders } = useBoundStore();

    const {cartBooks, emptyBookCart, loggedInUser, updateSelectedBooksStock} = useBoundStore();
    const [open, setOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const totalPrice = calculateTotalPrice(cartBooks, bookInfos);
    const {apiCall, loading, error} = useFetchRequest();
    const onOpenOrderSuccessModal = () => setOpen(true);
    const onCloseOrderSuccessModal = () => setOpen(false);
    const handleCloseOrderSuccessModal = () => {
        onCloseOrderSuccessModal();
        setOrderPlaced(true);
    };
    const handlePlaceOrder = () => {
        setLoadingOrders(true);setErrorOrders(null);
        const items = createOrderItems(cartBooks);
        console.log(items);

        apiCall(
            `${serverUrl}orders`,
            'POST',
            {
                items,
            },
            [
                () => {
                    updateSelectedBooksStock();

                }
            ],
            [setErrorOrders],
            [setLoadingOrders],
        ).finally(() => {

            onOpenOrderSuccessModal();
            emptyBookCart();
        });

    };

    if (orderPlaced) {
        return <Navigate to="/" replace/>;
    }

    return (  <Status loading={loadingOrders} error={errorOrders}>
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
        </Status>
    );
}

export default OrderPlacement;