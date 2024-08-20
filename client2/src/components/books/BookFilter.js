import React, {useEffect,  useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


import BookFilterOption from "./BookFilterOption";
import {useFetchRequest} from "../../api/CustomHook";
import Status from "../common/Status";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const BookFilter = () => {

    const [bookProperties, setBookProperties] = useState({genres: [], prices: [], publishers: [], covers: []});
    const bookAttributes = ["genres", "prices", "publishers", "covers"];
    const [error, setError] = useState(null);
    const {apiCall, loading} = useFetchRequest();


    useEffect(() => {
        const fetchBookFilters = () => {
            apiCall(`${serverUrl}books/properties`, 'GET', null, [setBookProperties], [setError]);
        };

        fetchBookFilters();
    }, []);



    return (
        <div id="filter-area">
            <div className="form-check">
                <Status loading={loading} error={error} />
                {bookAttributes.map((bookAttribute) => {
                    const category = bookAttribute.charAt(0).toUpperCase() + bookAttribute.slice(1);

                    return <div key={bookAttribute}>

                        <p className="fs-1">{category}</p>

                        {Array.isArray(bookProperties[bookAttribute]) && bookProperties[bookAttribute].map((filterOptionValue, index) => {
                            const trimmedBookAttribute = bookAttribute.slice(0, -1);

                            return <BookFilterOption
                                key={index}
                                bookAttribute={trimmedBookAttribute}
                                filterOptionValue={filterOptionValue}
                            />;
                        })}
                    </div>
                })

                }


            </div>
        </div>
    );
};

export default BookFilter;