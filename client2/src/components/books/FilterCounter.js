import React from 'react';
import {useBoundStore} from "../../BoundStore";
function FilterCounter(){
    const filterCount  = useBoundStore((state)=>state.filterCount());
    return (
        <div id="filterCounter">

                <h2>{filterCount} filters used</h2>

        </div>
    )

}
export default FilterCounter;