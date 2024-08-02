import React, { useState, useEffect } from 'react';

function BooksContainer() {
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

                        <div class="card" style={{width: '18rem'}}>
                            <a >
                                <img className="card-img-top" src={book.img} alt="Card image cap"/>
                                <div class="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"> {book.id}</li>
                                        <li className="list-group-item">{book.title}</li>
                                        <li className="list-group-item"> {book.author}</li>
                                        <li className="list-group-item">    {book.genre}</li>
                                        <li className="list-group-item">   {book.price}</li>
                                    </ul>


                                    {/*{book.publishedYear}*/}

                                    {/*{book.publisher}*/}
                                    {/*{book.cover}*/}


                                </div>
                            </a>

                        </div>
                    </div>
                                    ))}
                            </div>
                        </div>
                        )
                        }

export default BooksContainer;