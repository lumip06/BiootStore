import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useBoundStore} from "../../BoundStore";
import {getBookFilters} from "../../ServerCalls";


const BookFilter = () => {
    const { toggleFilter, checkboxes } = useBoundStore();
    const [properties, setProperties] = useState({ genres: [], prices: [], publishers: [], covers: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookFilters = async () => {
            try {
                const data = await getBookFilters();
                setProperties(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookFilters();
    }, []); // Empty dependency array to run only on mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div id="filter-area">
            <div className="form-check">
                <p className="fs-1">Subcategorii</p>
                {properties.genres.map((checkbox) => (
                    <div key={checkbox}>
                        <input
                            type="checkbox"
                            id={checkbox}
                            name={checkbox}
                            checked={checkboxes[checkbox] || false}
                            onChange={() => toggleFilter(checkbox, "genre")}
                        />
                        <label htmlFor={checkbox}>{checkbox}</label>
                    </div>
                ))}
                <p className="fs-1">Pret</p>
                {properties.prices.map((checkbox) => (
                    <div key={checkbox}>
                        <input
                            type="checkbox"
                            id={checkbox}
                            name={checkbox}
                            checked={checkboxes[checkbox] || false}
                            onChange={() => toggleFilter(checkbox, "price")}
                        />
                        <label htmlFor={checkbox}>{checkbox}</label>
                    </div>
                ))}
                <p className="fs-1">Editura</p>
                {properties.publishers.map((checkbox) => (
                    <div key={checkbox}>
                        <input
                            type="checkbox"
                            id={checkbox}
                            name={checkbox}
                            checked={checkboxes[checkbox] || false}
                            onChange={() => toggleFilter(checkbox, "publisher")}
                        />
                        <label htmlFor={checkbox}>{checkbox}</label>
                    </div>
                ))}
                <p className="fs-1">Tip coperta</p>
                {properties.covers.map((checkbox) => (
                    <div key={checkbox}>
                        <input
                            type="checkbox"
                            id={checkbox}
                            name={checkbox}
                            checked={checkboxes[checkbox] || false}
                            onChange={() => toggleFilter(checkbox, "cover")}
                        />
                        <label htmlFor={checkbox}>{checkbox}</label>
                    </div>
                ))}
                <p className="fs-1">Data publicarii</p>
            </div>
        </div>
    );
};

export default BookFilter;