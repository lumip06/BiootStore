import axios from "axios";
import {createOrderItems} from "./OrderAPI";

const serverUrl = process.env.REACT_APP_SERVER_URL;

//searches for books depending on the filters chosen
export const filterBooks = async (filters, limit) => {
    filters["limit"] = limit;

    return await axios.get(`${serverUrl}books/search?`, {
            params: filters
        }
    )
};

//gets filters values from the db to create the filters
export const getBookFilters = async () => {
    try {
        const response = await axios.get(`${serverUrl}books/properties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book properties:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error;
    }
};

//searches book with id
export const getOneBook = async (id) => {
    try {

        const response = await axios.get(`${serverUrl}books/${id}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching book properties:', error);
        throw error;
    }
};


export const updateStock = async (cartBooks) => {
    const items =cartBooks;
    console.log("ITEMS ",items)
    try {

        const response = await axios.post(`${serverUrl}books/update`, {
            items,
        }, {
            headers: {
                'Content-Type': 'application/json',

            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }

};
