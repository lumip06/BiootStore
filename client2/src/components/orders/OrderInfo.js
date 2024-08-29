import React, {useEffect, useState} from 'react';
import {useBoundStore} from "../../stores/BoundStore";
import "../../styles/OrderInfo.css"
import 'reactjs-popup/dist/index.css';
import OrderTableRow from "./OrderTableRow";
import OrderPlacement from "./OrderPlacement";
import { useFetchBookInfos} from "./CartUtils";


function OrderInfo() {

    const {cartBooks} = useBoundStore();

    const [bookInfos, setBookInfos] = useState({});
    let heading = ["Produs", "Disponibilitate", "Buc.", "Pret", "Total"];
    const fetchBookInfos = useFetchBookInfos();
    useEffect(() => {

        fetchBookInfos(setBookInfos);
    }, [cartBooks]);


    return (
        <div className="bookDetails">

            <table className="tableOrderInfo">
                <thead>
                <tr className="trhead">
                    {heading.map((head, headID) => (
                        <th className="thhead" key={headID}>{head}</th>
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
                        <td colSpan={5} className="noBooksTd">No books
                            available
                        </td>
                    </tr>
                )}

                </tbody>
            </table>
            <OrderPlacement bookInfos={bookInfos}/>


        </div>
    )
}

export default OrderInfo;