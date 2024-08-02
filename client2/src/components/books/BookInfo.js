import React from 'react';
import {useParams} from "react-router-dom";

function BookInfo() {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    console.log("ID FOUND"+id)
    React.useEffect(() => {
        const fetchBookInfo = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/books/${id}`); // Fetch specific book data
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setBook(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookInfo();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h2>{book.title}</h2>
                <h4>Author: {book.author}</h4>
                <p>Genre: {book.genre}</p>
                <p>Price: {book.price}</p>
                <img className="card-img-top" src={book.img} alt="Book cover" />
                {/* Add more details as needed */}
            </div>
        </div>
    )
}

export default BookInfo;