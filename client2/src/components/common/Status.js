import React from 'react';
import '../../styles/CommonComponents.css'
function Status({ loading, error }) {
    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return null;
}

export default Status;