import React, {useEffect, useState} from 'react';
import {useBoundStore} from "../../stores/BoundStore";
import {getCartBooksInfos} from "../../api/OrderAPI";
import "../../styles/CartModal.css"

import 'reactjs-popup/dist/index.css';

import OrderTableRow from "./OrderTableRow";
import OrderPlacement from "./OrderPlacement";
import {useFetchRequest} from "../../api/CustomHook";
const serverUrl = process.env.REACT_APP_SERVER_URL;


function OrderInfo() {
    const { cartBooks, getCartBookIds } = useBoundStore();
    const [bookInfos, setBookInfos] = useState({});
    const { apiCall, loading, error } = useFetchRequest();
    let heading = ["Produs", "Disponibilitate", "Buc.", "Pret", "Total"];

    useEffect(() => {
        const fetchBookInfos = () => {
            const cartBookIds = getCartBookIds();

            if (cartBookIds.length > 0) {
                apiCall(
                    `${serverUrl}books/infos`, // API URL
                    'GET', // HTTP method
                    null, // No body for GET request
                    [
                        (booksData) => {
                            const booksObject = booksData.reduce((acc, book) => {
                                acc[book._id] = book;
                                return acc;
                            }, {});
                            setBookInfos(booksObject);
                        }
                    ], // Success callback
                    [console.error], // Error callback
                    { ids: cartBookIds.join(',') } // Params object
                );
            } else {
                setBookInfos({});
            }
        };

        fetchBookInfos();
    }, [cartBooks]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="bookDetails">
            <div style={{width: "100%", overflow: "visible"}}>
                <table style={{width: "100%", border: '1px solid black', borderCollapse: 'collapse'}}>
                    <thead>
                    <tr style={{border: '1px solid black'}}>
                        {heading.map((head, headID) => (
                            <th style={{border: '1px solid black'}} key={headID}>{head}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(cartBooks).length > 0 ? (
                        Object.entries(cartBooks).map(([bookId, quantity], index) => {
                            const bookInfo = bookInfos[bookId];

                            if (!bookInfo) {
                                return (
                                    <OrderTableRow
                                        id={bookId}
                                        title="Loading..."
                                        initialQuantity={quantity}
                                        inStoc="Loading..."
                                        pret="Loading..."
                                        total="Loading..."
                                        key={index}
                                    />
                                );
                            }

                            return (
                                <OrderTableRow
                                    id={bookId}
                                    title={`${bookInfo.title} by ${bookInfo.author}`}
                                    initialQuantity={quantity}
                                    inStoc="Da"
                                    pret={bookInfo.price}
                                    total={bookInfo.price * quantity}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} style={{textAlign: "center", fontSize: "60px", padding: "30px"}}>No books
                                available
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
              <OrderPlacement bookInfos={bookInfos}/>

            </div>


        </div>
    )
}

export default OrderInfo;