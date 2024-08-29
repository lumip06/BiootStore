
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import BookItem from "../books/BookItem";
import {calculateTotalPrice, processBooksData} from "./CartUtils";
import {useFetchRequest} from "../../api/CustomHook";
import "../../styles/OrderDetails.css"
import {useBoundStore} from "../../stores/BoundStore";
import Status from "../common/Status";
const serverUrl = process.env.REACT_APP_SERVER_URL;

function OrderDetails({order}) {
    const { loadingOrders,errorOrders,setLoadingOrders,setErrorOrders } = useBoundStore();
    const { id } = useParams();
    const [bookInfos, setBookInfos] = useState({});
    const { apiCall } = useFetchRequest();
    const bookQuantities = order.items.reduce((acc, item) => {
        acc[item.bookId] = item.quantity;
        return acc;
    }, {});

    useEffect(() => {
        const fetchBookInfos = () => {
            setLoadingOrders(true);setErrorOrders(null);
            const itemIds = [];

            for (let i = 0; i < order.items.length; i++) {
                itemIds.push(order.items[i].bookId);
            }

            if (itemIds.length > 0) {

                const requestBody = { ids: itemIds };

                apiCall(
                    `${serverUrl}books/infos`,
                    'POST',
                    requestBody,
                    [
                        (booksData) => {

                            processBooksData(booksData, setBookInfos);
                        }
                    ],
                    [setErrorOrders],
                    [setLoadingOrders],
                );
            } else {
                setBookInfos({});
                setLoadingOrders(false);
            }

        };

        fetchBookInfos();
    }, []);


    const getQuantityForBookId = (bookId) => {
        const item = order.items.find(item => item.bookId === bookId);
        return item ? item.quantity : 0;
    };

    return (
        <div className="orderDetails">

            <div className="col1">
                <Status loading={loadingOrders} error={errorOrders}>
                <p><span>Order:</span> {id}</p>
                <p><span>Date:</span>{new Date(order.date).toLocaleDateString()}</p>
                <p><span>Placed by user:</span>{order.userId}</p>
                <p><span>Total price:</span>${calculateTotalPrice(bookQuantities, bookInfos).toFixed(2)}</p>
                </Status>
            </div>
            <div className="col2">
                <h1 className="orderDetailsH1">Books ordered:</h1>
                <div className={`miniViewContainer`}>
                    <Status loading={loadingOrders} error={errorOrders}>
                    {Object.keys(bookInfos).length > 0 ? (
                        Object.entries(bookInfos).map(([id, book]) => (
                            <div key={id}>
                                <h3>{getQuantityForBookId(id)} X </h3>
                                <BookItem book={book} view={"miniView"}/>
                            </div>
                        ))
                    ) : (
                        <p>No books available.</p>
                    )}
                    </Status>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails;