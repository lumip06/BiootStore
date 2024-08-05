
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItemCard from './BookItemCard';
import {useBoundStore} from "../../BoundStore";


function BookList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const filters=useBoundStore((state)=>state.filters);


    useEffect(() => {
        // Define the fetch function

        const fetchData = async () => {
            setLoading(true);
            try {


                // filters["offset"]=page*6;
                filters["limit"]=6;
                const jsonString = JSON.stringify(filters);
                console.log(filters)
                console.log(jsonString)
                const response = await axios.get('http://127.0.0.1:3000/books/search?',{
                    params:filters
                }
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

    return (
        <div className="container-fluid">
            <div className="row">
                {data.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <BookItemCard book={book} index={index} />
                    </div>
                ))}
            </div>
            <div className="row"></div>
        </div>
    );
}

export default BookList;