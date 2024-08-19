import React, {useState} from "react";
import {useBoundStore} from "../../stores/BoundStore";

function OrderTableRow({id, title, inStock, initialQuantity, pret, total}) {
    const [quantity, setQuantity] = useState(initialQuantity || 1);
    const {removeBookFromCart,changeBookQuantity} = useBoundStore();


    const handleChangeQuantity = (delta) => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + delta;


            if (newQuantity <= 0) {
                removeBookFromCart(id);
                return 0;
            } else if (newQuantity > inStock) {
                return prevQuantity;
            } else {

                changeBookQuantity(id, newQuantity);
                return newQuantity;
            }
        });
    };

    return (
        <tr style={{height: "50%", width: "100%"}}>
            <td style={{padding: "45px"}}>{title}</td>
            <td style={{padding: "45px"}}>{inStock}</td>
            <td>
                <div className="number">
                    <span className="minus" onClick={() => handleChangeQuantity(-1)}>-</span>
                    <input type="text" value={quantity} readOnly/>
                    <span className="plus" onClick={() => handleChangeQuantity(1)}>+</span>

                    <button onClick={() => removeBookFromCart(id)}
                            className="btn btn-outline-dark ">&#10006;</button>
                </div>
            </td>
            <td style={{padding: "45px"}}>{pret}</td>
            <td style={{padding: "45px"}}>{total}</td>
        </tr>
    );
}

export default OrderTableRow;