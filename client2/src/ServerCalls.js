import axios from "axios";

// const uri = process.env.SERVER_URL;

export const filterBooks = async (filters) => {
    // filters["offset"]=page*6;
    filters["limit"]=6;
    const jsonString = JSON.stringify(filters);
    console.log(filters)
    console.log(jsonString)
    return await axios.get('http://127.0.0.1:3000/books/search?', {
            params: filters
        }
    )
};



