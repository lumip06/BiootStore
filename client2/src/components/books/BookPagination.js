import React from 'react';
import {useBoundStore} from "../../BoundStore";
function BookPagination(){
    const store  = useBoundStore();
    return (
        <div id="pagination">

            <button className="btn btn-outline-dark" onClick={store.previousPage}
                    disabled={store.page === 0}>Previous Page
            </button>
            <p className="btn btn-outline-dark" style={{margin: '15px'}}>{store.page}</p>
            <button className="btn btn-outline-dark" onClick={store.nextPage}>Next Page</button>
        </div>
    )

}

export default BookPagination;