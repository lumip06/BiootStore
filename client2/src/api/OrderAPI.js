import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;



export const getCartBooksInfos = async (ids) => {
    try {
        const response = await axios.get(`${serverUrl}books/infos`, {
            params: { ids: ids.join(',') }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching book properties:', error);
        throw error;
    }
};

export const placeOrder = async (cartBooks,booksInfos,loggedInUser) => {
    const { items } = createOrderItems(cartBooks, booksInfos);
    const userId =loggedInUser.userId;
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    console.log("USER ID IN CLIENT:",userId)
    try {

        const response = await axios.post(`${serverUrl}orders`, {
            userId,
            items,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }

};

export const createOrderItems =  (cartBooks,booksInfos) => {
    let items = [];

    if (Object.keys(cartBooks).length > 0) {
        Object.entries(cartBooks).forEach(([bookId, quantity]) => {
            const item = {
                bookId: bookId,
                quantity: quantity,
                price: booksInfos[bookId].price
            };
            items.push(item);
        });
        return { items };
    } else {
        return { items: [] };
    }
};

export const getOrdersForUser = async (id) => {
    try {

        const response = await axios.get(`${serverUrl}orders/user/${id}`);

        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders for user:', error);
        throw error;
    }
};
