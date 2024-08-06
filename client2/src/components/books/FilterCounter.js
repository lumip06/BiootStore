import React from 'react';
import {useBoundStore} from "../../BoundStore";
function FilterCounter(){
    const filterCount  = useBoundStore((state)=>state.filterCount());
    const booksTotal=useBoundStore((state)=>state.booksTotal);
    return (
        <div id="filterCounter">

            <h2>{filterCount} filters used</h2>
            <h2>{booksTotal} books</h2>
        </div>
    )

}

export default FilterCounter;