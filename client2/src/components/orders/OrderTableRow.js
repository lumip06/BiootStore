import React, {useEffect, useState} from "react";
import {useBoundStore} from "../../stores/BoundStore";
import "./../../styles/OrderTableRow.css"
function OrderTableRow({id, title, inStock, initialQuantity, pret, total}) {
    const [quantity, setQuantity] = useState(initialQuantity || 1);
    const {removeBookFromCart,changeBookQuantity} = useBoundStore();


    useEffect(() => {
        setQuantity(initialQuantity || 1);
    }, [id, initialQuantity]);

    const handleChangeQuantity = (delta) => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + delta;


            if (newQuantity <= 0) {

                return prevQuantity;
            } else if (newQuantity > inStock) {

                return inStock;
            } else {

                changeBookQuantity(id, newQuantity);
                return newQuantity;
            }

        });
    };

    return (
        <tr >
            <td >{title}</td>
            <td >{inStock}</td>
            <td>
                <div className="number">
                    <span className="minus" onClick={() => handleChangeQuantity(-1)}>-</span>
                    <input type="text" value={quantity} readOnly/>
                    <span className="plus" onClick={() => handleChangeQuantity(1)}>+</span>

                    <button onClick={() => removeBookFromCart(id)}
                            className="btn btn-outline-dark ">&#10006;</button>
                </div>
            </td>
            <td >{pret}</td>
            <td >{total}</td>
        </tr>
    );
}

export default OrderTableRow;