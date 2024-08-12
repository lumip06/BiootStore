import React, {useEffect, useState} from 'react';
import {useBoundStore} from "../../BoundStore";
import {getCartBooksInfos, placeOrder} from "../../API";
import "./../../styles/CartModal.css"
import  { Navigate } from 'react-router-dom'

import 'reactjs-popup/dist/index.css';
import {Modal} from "react-responsive-modal";


function OrderInfo() {
    let heading = ["Produs", "Disponibilitate", "Buc.", "Pret", "Total"];
    const {cartBooks, removeBookFromCart, getCartBookIds, emptyBookCart} = useBoundStore()
    const [bookInfos, setBookInfos] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    // const openPopup = () => setIsOpen(true);
    // const closePopup = () => setIsOpen(false);
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
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const handleCloseModal = () => {
        onCloseModal();          // Call the original onCloseModal function
        setOrderPlaced(true);    // Set the orderPlaced state to true to trigger redirection
    };

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

    const [orderPlaced, setOrderPlaced] = useState(false);

    if (orderPlaced) {
        return <Navigate to="/" replace />;
    }
    const TableRow = ({id, title, inStoc, initialQuantity, pret, total}) => {

        // Initialize the quantity state
        const [quantity, setQuantity] = useState(initialQuantity || 1); // Default to 1 if initialQuantity is undefined

        const handleDecrease = () => {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity - 1;
                // Check if quantity reaches 0, and call the onDelete function
                if (newQuantity <= 0) {
                    removeBookFromCart(id) // Call the delete function passed as a prop
                    return 0; // Set quantity to 0
                }
                return newQuantity;
            });
        };
        const handleIncrease = () => {
            setQuantity((prevQuantity) => prevQuantity + 1); // Simply increase the quantity
        };
        return (<tr style={{height: "50%", width: "100%"}}>
                <td style={{padding: "45px"}}>{title}</td>
                <td style={{padding: "45px"}}>{inStoc}</td>
                <td>
                    <div className="number">
                        <span className="minus" onClick={handleDecrease}>-</span>
                        <input
                            type="text"
                            value={quantity}
                            readOnly // Make input read-only to avoid manual edits
                        />
                        <span className="plus" onClick={handleIncrease}>+</span>
                        <button onClick={() => removeBookFromCart(id)}
                                className="btn btn-outline-dark ">&#10006;</button>
                    </div>


                </td>
                <td style={{padding: "45px"}}>{pret}</td>
                <td style={{padding: "45px"}}>{total}</td>
            </tr>
        )
            ;
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
                                    <TableRow
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
                                <TableRow
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
                <div style={{marginTop: "20px", textAlign: "right", padding: "50px"}}>
                    <h1>TOTAL: {totalPrice} </h1>
                    <button onClick={() => {
                        placeOrder(cartBooks, bookInfos);
                        emptyBookCart();
                        onOpenModal()

                    }} className="btn btn-outline-dark btn-lg">Order books
                    </button>
                    <Modal open={open} onClose={handleCloseModal} center>
                        <div >
                            <h1>Order placed succesfully</h1>

                        </div>
                    </Modal>

                </div>

            </div>


        </div>
    )
}

export default OrderInfo;