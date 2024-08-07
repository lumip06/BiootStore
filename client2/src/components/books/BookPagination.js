import React from 'react';
import {useBoundStore} from "../../BoundStore";
function BookPagination(){
    const {page,limit,booksTotal,nextPage,previousPage}  = useBoundStore();
    // Calculate the total number of pages
    const totalPages = Math.ceil(booksTotal / limit);
    console.log("book"+ booksTotal)
    console.log(limit)
    return (
        <div id="pagination">

            <button className="btn btn-outline-dark" onClick={previousPage}
                    disabled={page === 0}>Previous Page
            </button>
            <p className="btn btn-outline-dark" style={{margin: '15px'}}>{page + 1} out of {totalPages }</p>
            <button className="btn btn-outline-dark" onClick={nextPage}
                    disabled={page >= totalPages - 1}>Next Page</button>
        </div>
    )

}

export default BookPagination;