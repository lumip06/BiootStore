import React from 'react';
import {useBoundStore} from "../../stores/BoundStore";
function Counters(){
    const filterCount  = useBoundStore((state)=>state.filterCount());
    const booksTotal=useBoundStore((state)=>state.booksTotal);
    return (
        <div id="filterCounter">
            <h2 style={{ fontStyle: 'italic'}}>{filterCount} filters used {booksTotal} books</h2>

        </div>
    )

}

export default Counters;