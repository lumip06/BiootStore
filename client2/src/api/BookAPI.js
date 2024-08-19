import axios from "axios";
import qs from 'qs';
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

    }
};

//searches book with id
export const getOneBook = async (id) => {
    try {

        const response = await axios.get(`${serverUrl}books/${id}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching book properties:', error);

    }
};

export const getCartBooksInfos = async (ids) => {
    try {
        const queryParams = qs.stringify({ ids }, { arrayFormat: 'brackets' });

        const response = await axios.get(`${serverUrl}books/infos?${queryParams}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching book properties:', error);

    }
};

export const updateStock = async (cartBooks) => {
    const items = Object.keys(cartBooks).map(bookId => ({
        bookId: bookId,
        quantity: cartBooks[bookId]
    }));

    console.log("Converted ITEMS ", items);

    try {
        const response = await axios.put(`${serverUrl}books`, {
            items,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Error response:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('Error request:', error.request);
        } else {
            // Something else happened in setting up the request
            console.error('Error message:', error.message);
        }

    }

};