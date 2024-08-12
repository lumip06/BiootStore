import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const filterBooks = async (filters, limit, page) => {

    filters["limit"] = limit;

    return await axios.get(`${serverUrl}books/search?`, {
            params: filters
        }
    )
};

export const getBookFilters = async () => {
    try {
        const response = await axios.get(`${serverUrl}books/properties`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching book properties:', error); // Log the error object
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error; // Rethrow error if needed
    }
};


export const getOneBook = async (id) => {
    try {
         // Fetch specific book data
        return await fetch(`${serverUrl}books/${id}`);

    } catch (error) {
        console.error('Error fetching book properties:', error); // Log the error object
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error; // Rethrow error if needed
    }
};



export const getCartBooksInfos = async (ids) => {
    try {


        // Fetch book data by passing ids in the query parameter
        const response = await fetch(`${serverUrl}books/infos?ids=${ids.join(',')}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error('Error fetching book properties:', error); // Log the error object
        throw error; // Rethrow error if needed
    }
};

export const placeOrder = async (cartBooks,booksInfos) => {
    const { items } = createOrderItems(cartBooks, booksInfos); // Destructure to get the items array


    try {
        // Log the payload to ensure it is correct
        console.log('Sending order items:', items); // No need to wrap in an object
        const response = await fetch(`${serverUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items }), // Correctly sending the items array
        });

        if (!response.ok) {
            throw new Error(`Failed to create order: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Rethrow error if needed
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
        return { items };  // Return an object with the items array
    } else {
        return { items: [] };  // Return an empty items array if there are no items
    }
};