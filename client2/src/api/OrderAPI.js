import axios from "axios";
import {createOrderItems} from "./APIUtils";

const serverUrl = process.env.REACT_APP_SERVER_URL;



export const placeOrder = async (cartBooks,booksInfos,loggedInUser) => {
    const  items  = createOrderItems(cartBooks, booksInfos);
    const userId =loggedInUser.userId;

    try {

        const response = await axios.post(`${serverUrl}orders`, {
            userId,
            items,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });


        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);

    }

};



export const getOrdersForUser = async (id) => {
    try {

        const response = await axios.get(`${serverUrl}orders/user/${id}`);

        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders for user:', error);

    }
};
