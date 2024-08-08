import React, {useEffect, useRef, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import {getBookFilters} from "../../API";
import BookFilterOption from "./BookFilterOption";


const BookFilter = () => {

    const [bookProperties, setBookProperties] = useState({genres: [], prices: [], publishers: [], covers: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const bookAttributes = ["genres", "prices", "publishers", "covers"];
    useEffect(() => {


        const fetchBookFilters = async () => {
            setLoading(true);
            try {
                const data = await getBookFilters();

                setBookProperties(data);

            } catch (err) {

                setError(err);

            } finally {

                setLoading(false);

            }

        };

        fetchBookFilters();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div id="filter-area">
            <div className="form-check">

                {bookAttributes.map((bookAttribute) => {
                        const category = bookAttribute.charAt(0).toUpperCase() + bookAttribute.slice(1);

                        return <div key={bookAttribute}>

                            <p className="fs-1">{category}</p>

                            {Array.isArray(bookProperties[bookAttribute]) &&
                                bookProperties[bookAttribute].map((filterOptionValue, index) => {
                                        const trimmedBookAttribute = bookAttribute.slice(0, -1);

                                        return <BookFilterOption
                                            key={index}
                                            bookAttribute={trimmedBookAttribute}
                                            filterOptionValue={filterOptionValue}
                                        />;
                                    }
                                )}
                        </div>
                    }
                )

                }


            </div>
        </div>
    );
};

export default BookFilter;