import React from 'react';

function ViewChanger(){

    return (
        <div id="viewChanger">
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px'}}>
                <button className="btn btn-outline-dark" >CardView</button>
                <button className="btn btn-outline-dark" >ListView</button>
            </div>
        </div>
    )

}

export default ViewChanger;