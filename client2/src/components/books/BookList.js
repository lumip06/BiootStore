
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';


function BookList({ filters }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the fetch function
        // let filterString = ""; // Adjust this based on filters if needed

        const fetchData = async () => {
            try {
                // Build the filter query string
                let filterJSON=JSON
                for (const [key, value] of Object.entries(filters)) {
                    filterJSON[key]=value[0];
                }
                console.log(filterJSON)
                const options = {
                    method: 'GET',
                    params:filterJSON
                };
                const response = await axios.get('http://127.0.0.1:3000/books/search?',
                    options
                );
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchData();
    }, [filters]); // Empty dependency array means this effect runs once when the component mounts

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);
    console.log(filters);
    return (
        <div className="container-fluid">
            <div className="row">
                {data.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <BookItem book={book} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookList;