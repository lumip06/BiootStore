import axios from "axios";

// const uri = process.env.SERVER_URL;

export const filterBooks = async (filters) => {

    filters["limit"]=6;

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



