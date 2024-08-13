import React, {useState} from "react";
import {useBoundStore} from "../../stores/BoundStore";

function OrderTableRow({id, title, inStoc, initialQuantity, pret, total}) {
    const [quantity, setQuantity] = useState(initialQuantity || 1);
    const {removeBookFromCart} = useBoundStore();

    const handleDecrease = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity - 1;
            if (newQuantity <= 0) {
                removeBookFromCart(id);
                return 0;
            }
            return newQuantity;
        });
    };

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    return (
        <tr style={{height: "50%", width: "100%"}}>
            <td style={{padding: "45px"}}>{title}</td>
            <td style={{padding: "45px"}}>{inStoc}</td>
            <td>
                <div className="number">
                    <span className="minus" onClick={handleDecrease}>-</span>
                    <input type="text" value={quantity} readOnly/>
                    <span className="plus" onClick={handleIncrease}>+</span>

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