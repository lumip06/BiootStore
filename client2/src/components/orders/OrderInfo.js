import React, {useEffect, useState} from 'react';
import {useBoundStore} from "../../stores/BoundStore";
import {getCartBooksInfos, placeOrder} from "../../API";
import "../../styles/CartModal.css"
import  { Navigate } from 'react-router-dom'

import 'reactjs-popup/dist/index.css';
import {Modal} from "react-responsive-modal";
import OrderTableRow from "./OrderTableRow";
import OrderPlacement from "./OrderPlacement";


function OrderInfo() {
    let heading = ["Produs", "Disponibilitate", "Buc.", "Pret", "Total"];
    const {cartBooks,  getCartBookIds} = useBoundStore()
    const [bookInfos, setBookInfos] = useState({});


    useEffect(() => {
        const fetchBookInfos = async () => {
            const cartBookIds = getCartBookIds();


            if (cartBookIds.length > 0) {
                try {
                    const booksData = await getCartBooksInfos(cartBookIds);
                    const booksObject = booksData.reduce((acc, book) => {
                        acc[book._id] = book;
                        return acc;
                    }, {});
                    setBookInfos(booksObject);
                } catch (error) {
                    console.error('Failed to fetch book infos:', error);
                }
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