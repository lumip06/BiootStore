import React from 'react';
import {useBoundStore} from "../../BoundStore";

function BookPagination() {
    const {page, limit, booksTotal, nextPage, previousPage, updateLimit} = useBoundStore();
    // Calculate the total number of pages
    const totalPages = Math.ceil(booksTotal / limit);
    console.log("book" + booksTotal)
    console.log(limit)
    return (
        <div id="pagination">
            <div>
                <button className="btn btn-outline-dark" onClick={previousPage}
                        disabled={page === 0}>Previous Page
                </button>
                <p className="btn btn-outline-dark" style={{margin: '15px'}}>{page + 1} out of {totalPages}</p>
                <button className="btn btn-outline-dark" onClick={nextPage}
                        disabled={page >= totalPages - 1}>Next Page
                </button>
            </div>
            <label htmlFor="pagelimit" style={{padding: '15px'}}>Books per page:</label>

            <select
                name="pagelimit"
                id="pagelimit"
                className="btn btn-outline-dark"
                style={{marginRight: '10px'}}
                onChange={(e) => updateLimit(e.target.value)}>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12" selected="selected">12</option>
                <option value="15">15</option>
            </select>

        </div>
    )

}

export default BookPagination;