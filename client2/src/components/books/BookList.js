import React, {useState, useEffect} from 'react';

import BookItem from './BookItem';
import {useBoundStore} from "../../BoundStore";
import {filterBooks} from "../../ServerCalls";


function BookList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const filters = useBoundStore((state) => state.filters);

    const [isButtonCardDisabled, setIsButtonCardDisabled] = useState(true);
    const [isButtonListDisabled, setIsButtonListDisabled] = useState(false);

    const handleClick = () => {
        setIsButtonCardDisabled(!isButtonCardDisabled);
        setIsButtonListDisabled(!isButtonListDisabled);
    };

    useEffect(() => {
        // Define the fetch function

        const fetchData = async () => {
            setLoading(true);
            try {



                const response= await filterBooks(filters)

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
            <div id="viewChanger">
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px'}}>
                    <button id="buttonCard" className="btn btn-outline-dark" disabled={isButtonCardDisabled}
                            onClick={handleClick}>CardView
                    </button>
                    <button id="buttonList" className="btn btn-outline-dark" disabled={isButtonListDisabled}
                            onClick={handleClick}>ListView
                    </button>
                </div>
            </div>


            <div className={`${(isButtonCardDisabled ? "cardView" : "listView ")}Container`}>
                {data && data.length > 0 ? (
                    data.map((book, index) => (
                        <div key={index}>
                            <BookItem book={book} index={index} view={isButtonCardDisabled ? "cardView" : "listView"} />
                        </div>
                    ))
                ) : (
                    <p>No books available.</p>
                )}

            </div>

        </div>
    );
}

export default BookList;