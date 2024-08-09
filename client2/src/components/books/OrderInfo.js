import React, {useEffect, useState} from 'react';
import {useBoundStore} from "../../BoundStore";
import {getCartBooksInfos} from "../../API";
import "./../../styles/CartModal.css"
function OrderInfo() {
    let heading = ["Produs","Disponibilitate","Buc.","Pret","Total"];
    const {cartBooks,removeBookFromCart, getCartBookIds,updateBookQuantityInCart}=useBoundStore()
    const [bookInfos, setBookInfos] = useState({});

    // console.log(cartBookIds)
    // console.log(getCartBooksInfos(cartBookIds))
    useEffect(() => {
        const fetchBookInfos = async () => {
            const cartBookIds = getCartBookIds(); // Get current cart IDs

            // Only fetch if there are valid IDs
            if (cartBookIds.length > 0) {
                try {
                    const booksData = await getCartBooksInfos(cartBookIds);
                    const booksObject = booksData.reduce((acc, book) => {
                        acc[book._id] = book;
                        return acc;
                    }, {});
                    setBookInfos(booksObject); // Store the books in state
                } catch (error) {
                    console.error('Failed to fetch book infos:', error);
                }
            } else {
                // Optionally, you can set an empty bookInfos or handle the case where there are no books
                setBookInfos({});
            }
        };

        fetchBookInfos();
    }, [cartBooks]); // Trigger effect when cartBooks changes

    // Calculate the total price
    const calculateTotalPrice = () => {
        return Object.entries(cartBooks).reduce((total, [bookId, quantity]) => {
            const bookInfo = bookInfos[bookId];
            if (bookInfo) {
                return total + (bookInfo.price * quantity);
            }
            return total;
        }, 0);
    };

    const totalPrice = calculateTotalPrice();
    const TableRow = ({ id,title, inStoc,quantity,pret,total }) => (
        <tr style={{ height: "50%", width: "100%"}}>
            <td style={{padding:"45px"}}>{title}</td>
            <td style={{padding:"45px"}}>{inStoc}</td>
            <td style={{ display: "flex",  justifyContent: "center",  alignItems: "center",padding:"45px" }}>
                <select name="quantity" id="quantity" value={quantity} style={{marginRight:"25px"}}
                        onChange={(e) => {
                            const newQuantity = Number(e.target.value);
                            if (newQuantity === 0) {
                                removeBookFromCart(id);
                            } else {
                                updateBookQuantityInCart(id, newQuantity);
                            }
                        }}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={() => removeBookFromCart(id)}
                        className="btn btn-outline-dark ">&#10006;</button>
            </td>
            <td style={{padding:"45px"}}>{pret}</td>
            <td style={{padding:"45px"}}>{total}</td>
        </tr>
    );
    return (
        <div className="bookDetails">
            <div style={{ width: "100%", overflow: "visible" }}>
                <table  style={{ width: "100%", border: '1px solid black', borderCollapse: 'collapse' }}>
                    <thead >
                    <tr style={{ border: '1px solid black' }}>
                        {heading.map((head, headID) => (
                            <th style={{border: '1px solid black'}}  key={headID}>{head}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(cartBooks).length > 0 ? (
                        Object.entries(cartBooks).map(([bookId, quantity], index) => {
                            const bookInfo = bookInfos[bookId];

                            if (!bookInfo) {
                                return (
                                    <TableRow
                                        id={bookId}
                                        title="Loading..."
                                        quantity={quantity}
                                        inStoc="Loading..."
                                        pret="Loading..."
                                        total="Loading..."
                                        key={index}
                                    />
                                );
                            }

                            return (
                                <TableRow
                                    id={bookId}
                                    title={`${bookInfo.title} by ${bookInfo.author}`}
                                    quantity={quantity}
                                    inStoc="Da"
                                    pret={bookInfo.price}
                                    total={bookInfo.price * quantity}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} style={{textAlign: "center" ,fontSize:"60px" ,padding:"30px"}}>No books available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" ,padding:"50px"}}>
                    <h1>TOTAL: {totalPrice} </h1> {/* Display the total price */}
                    <button className="btn btn-outline-dark btn-lg"> ORDER</button>
                </div>

            </div>


        </div>
    )
}

export default OrderInfo;