import React, {useEffect, useState} from 'react';
import {useBoundStore} from "../../stores/BoundStore";
import "../../styles/CartModal.css"

import 'reactjs-popup/dist/index.css';

import OrderTableRow from "./OrderTableRow";
import OrderPlacement from "./OrderPlacement";
import {useFetchRequest} from "../../api/CustomHook";
import {getCartBooksInfos} from "../../api/BookAPI";
import Status from "../common/Status";
import {processBooksData} from "./CartUtils";
import qs from "qs";
const serverUrl = process.env.REACT_APP_SERVER_URL;


function OrderInfo() {
    const { cartBooks, getCartBookIds ,getToken} = useBoundStore();
    const [bookInfos, setBookInfos] = useState({});
    const { apiCall, loading, error } = useFetchRequest();
    let heading = ["Produs", "Disponibilitate", "Buc.", "Pret", "Total"];

    useEffect(() => {
        const fetchBookInfos = () => {
            const cartBookIds = getCartBookIds();

            if (cartBookIds.length > 0) {



                // const queryParams = new URLSearchParams({ ids: cartBookIds.join(',') }).toString();
                const queryParams = qs.stringify({ids: cartBookIds}, {arrayFormat: 'brackets'});
                apiCall(
                    `${serverUrl}books/infos?${queryParams}`,
                    'GET',
                    null,
                    [
                        (booksData) => processBooksData(booksData, setBookInfos)
                    ],
                    [console.error],
                    getToken()
                );
            } else {
                setBookInfos({});
            }
        };

        fetchBookInfos();
    }, [cartBooks]);




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
                    <tr>
                        <td colSpan="5">
                            <Status loading={loading} error={error}/>
                        </td>
                    </tr>
                    {Object.keys(cartBooks).length > 0 ? (
                        Object.entries(cartBooks).map(([bookId, quantity], index) => {
                            const bookInfo = bookInfos[bookId];

                            if (!bookInfo) {
                                return (
                                    <OrderTableRow
                                        id={bookId}
                                        title="Loading..."
                                        initialQuantity={quantity}
                                        inStock="Loading..."
                                        pret="Loading..."
                                        total="Loading..."
                                        stock="Loading.."
                                        key={index}
                                    />
                                );
                            }

                            return (
                                <OrderTableRow
                                    id={bookId}
                                    title={`${bookInfo.title} by ${bookInfo.author}`}
                                    initialQuantity={quantity}
                                    inStock={bookInfo.stock}
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