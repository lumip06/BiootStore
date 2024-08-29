import React, {useEffect,  useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BookFilterOption from "./BookFilterOption";
import {useFetchRequest} from "../../api/CustomHook";
import Status from "../common/Status";
import {useBoundStore} from "../../stores/BoundStore";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const BookFilter = () => {
    const { loadingBooks, errorBooks, setLoadingBooks, setErrorBooks } = useBoundStore();
    const [bookProperties, setBookProperties] = useState({genres: [], prices: [], publishers: [], covers: []});
    const bookAttributes = ["genres", "prices", "publishers", "covers"];
    const {apiCall} = useFetchRequest();


    useEffect(() => {
        setLoadingBooks(true);setErrorBooks(null);
        const fetchBookFilters = () => {
            apiCall(`${serverUrl}books/properties`,
                'GET',
                null,
                [setBookProperties],
                [setErrorBooks],
                [setLoadingBooks]);
        };

        fetchBookFilters();
        setLoadingBooks(false);
    }, []);


    return (

        <div id="filter-area">
            <div className="form-check">

                {bookAttributes.map((bookAttribute) => {
                    const category = bookAttribute.charAt(0).toUpperCase() + bookAttribute.slice(1);

                    return <div key={bookAttribute}>
                        <Status loading={loadingBooks} error={errorBooks}>
                        <p className="fs-1">{category}</p>

                        {Array.isArray(bookProperties[bookAttribute]) && bookProperties[bookAttribute].map((filterOptionValue, index) => {
                            const trimmedBookAttribute = bookAttribute.slice(0, -1);

                            return <BookFilterOption
                                key={index}
                                bookAttribute={trimmedBookAttribute}
                                filterOptionValue={filterOptionValue}
                            />;
                        })}
                        </Status>
                    </div>
                })

                }


            </div>
        </div>

    );
};

export default BookFilter;