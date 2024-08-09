import React from 'react';
import {useBoundStore} from "../../BoundStore";

function OrderInfo() {
    let heading = ["Produs","Disponibilitate","Buc.","Pret","Total"];
    const {cartBooks,removeBookFromCart, updateBookQuantityInCart}=useBoundStore()

    const TableRow = ({ id, inStoc,quantity,pret,total }) => (
        <tr style={{ height: "50%", width: "100%"}}>
            <td style={{padding:"45px"}}>{id}</td>
            <td style={{padding:"45px"}}>{inStoc}</td>
            <td style={{ display: "flex",  justifyContent: "center",  alignItems: "center",padding:"45px" }}>
                <select name="quantity" id="quantity" value={quantity} style={{marginRight:"25px"}}
                        onChange={(e) => updateBookQuantityInCart(id, e.target.value)}>
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
            <div>
                <table style={{height: "50%", width: "100%", marginBottom: "100px", border: '1px solid black', borderCollapse: 'collapse'}}>
                    <thead >
                    <tr style={{ border: '1px solid black' }}>
                        {heading.map((head, headID) => (
                            <th style={{border: '1px solid black'}}  key={headID}>{head}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(cartBooks).length > 0 ? (
                        Object.entries(cartBooks).map(([bookId, quantity], index) => (

                            <TableRow
                                id={bookId}
                                quantity={quantity}
                                inStoc="Da"
                                pret="0"
                                total="0"
                                key={index}
                            />

                        ))
                    ) : (
                        <p>No books available.</p>
                    )}
                    </tbody>
                </table>
                <button className="btn btn-outline-dark btn-lg"> ORDER</button>
            </div>


        </div>
    )
}

export default OrderInfo;