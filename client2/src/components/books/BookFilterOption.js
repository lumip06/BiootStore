import React from 'react';

import {useBoundStore} from "../../stores/BoundStore";

function BookFilterOption({bookAttribute,filterOptionValue}) {
    const {toggleFilter} = useBoundStore();
    const {  filterOptions } = useBoundStore(state => ({
        filterOptions: state.filterOptions,
    }));

    return (
        <div className="bookFilterOption">
            <div key={filterOptionValue}>
                <input
                    type="checkbox"
                    id={filterOptionValue}
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