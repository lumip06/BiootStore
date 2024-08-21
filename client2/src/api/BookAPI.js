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
        const response = await axios.post(`${serverUrl}books/infos`,
            { ids },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching book properties:', error);
    }
};

export const addNewBook = async (formData) => {
    const book = {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        publisher: formData.publisher,
        publishedYear:formData.publishedYear,
        cover:formData.cover,
        price:formData.price,
        stock:formData.stock,
        img:formData.img
    };

    try {
        console.log('Sending book data :', book);

        const response = await axios.post(`${serverUrl}books/`, [book], {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);

    }
};
