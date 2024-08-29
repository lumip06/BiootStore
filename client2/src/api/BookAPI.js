import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;


export const filterBooks = async (filters, limit) => {
    filters["limit"] = limit;

    return await axios.get(`${serverUrl}books/search?`, {
            params: filters
        }
    )
};


export const getOneBook = async (id) => {

        const response = await axios.get(`${serverUrl}books/${id}`);

        return response.data;

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


        const response = await axios.post(`${serverUrl}books/`, [book], {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;

};
