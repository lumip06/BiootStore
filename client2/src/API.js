import axios from "axios";

// const uri = process.env.SERVER_URL;

export const filterBooks = async (filters, limit, page) => {

    filters["limit"] = limit;

    return await axios.get('http://127.0.0.1:3000/books/search?', {
            params: filters
        }
    )
};

export const getBookFilters = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3000/books/properties');
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
        return await fetch(`http://127.0.0.1:3000/books/${id}`);

    } catch (error) {
        console.error('Error fetching book properties:', error); // Log the error object
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error; // Rethrow error if needed
    }
};



export const getCartBooksInfos = async (ids) => {
    try {


        // Fetch book data by passing ids in the query parameter
        const response = await fetch(`http://127.0.0.1:3000/books/infos?ids=${ids.join(',')}`);

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