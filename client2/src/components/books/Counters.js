import React from 'react';
import {useBoundStore} from "../../stores/BoundStore";
function Counters(){
    const filterCount  = useBoundStore((state)=>state.filterCount());
    const booksTotal=useBoundStore((state)=>state.booksTotal);
    //TODO de pus style ul in stylesheet
    return (
        <div id="filterCounter">
            <h2 style={{ fontStyle: 'italic',color:"#C9D5B5",backgroundColor:"#533745",border: "2px solid #533745" ,borderRadius: "25px",padding: "10px"}}>
                {filterCount} filters used => {booksTotal} books</h2>
        </div>
    )

}

export default Counters;