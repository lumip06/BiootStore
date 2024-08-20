import React from 'react';
import "../../styles/Filter.css"
import {useBoundStore} from "../../stores/BoundStore";

function BookFilterOption({bookAttribute,filterOptionValue}) {
    const {toggleFilter, filterOptions} = useBoundStore();


    return (
        <div className="bookFilterOption">
            <div key={filterOptionValue}>
                <input
                    type="checkbox"
                    id={filterOptionValue}
                    className="form-check-input "
                    style={{ width:"40px" ,height:"40px"}}
                    name={filterOptionValue}
                    checked={filterOptions[filterOptionValue] || false}
                    onChange={(e) => toggleFilter(filterOptionValue, bookAttribute, e.target.checked)}
                />
                <label htmlFor={filterOptionValue}>{filterOptionValue}</label>
            </div>
        </div>
    )
}

export default BookFilterOption;