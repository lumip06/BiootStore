import React, {useEffect, useState} from 'react';

import {Alert, Spinner} from 'react-bootstrap';

function Status({loading, error, children}) {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    const handleErrorClose = () => setShowError(false);

    return (
        <div style={{ position: 'relative' }}>
            {loading && (
                <div className="loading-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {showError && (
                <Alert
                    variant="danger"
                    dismissible
                    onClose={handleErrorClose}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                    }}
                >
                    {error}
                </Alert>
            )}

            <div style={{ opacity: showError ? 0.5 : 1 }}>{children}</div>
        </div>
    );

}

export default Status;