import React, { useState, useEffect } from 'react';
import BookItem from "./BookItem";

function BookList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Define the fetch function
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3000/books/search?limit=6",{method:"GET"})

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(data);
    return (
        <div className="container-fluid">
            <div className="row">
                {data.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <BookItem book={book} index={index}/>
                    </div>

                ))}
            </div>
        </div>
                        )
                        }

export default BookList;