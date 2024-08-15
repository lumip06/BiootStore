import { useState } from "react";

export const invokeFunctions = (functionArray, args) => {
    functionArray.forEach(func => func(args));
}

export const useFetchRequest = () => {
    const [loading, setLoading] = useState(false);

    const apiCall = async (url, method, body, successCallbacks, errorCallbacks, token = null) => {
        setLoading(true);
        try {
            // Construct headers object
            const headers = {
                'Content-Type': 'application/json',
            };

            // Add Authorization header if token is provided
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const options = {
                method,
                headers,
            };

            // Only include the body if the method is not GET or HEAD
            if (method !== 'GET' && method !== 'HEAD') {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);
            const data = await response.json();

            if (successCallbacks && successCallbacks.length) {
                invokeFunctions(successCallbacks, data);
            }
        } catch (err) {
            if (errorCallbacks && errorCallbacks.length) {
                invokeFunctions(errorCallbacks, err);
            }
        } finally {
            setLoading(false);
        }
    };

    return { apiCall, loading };
}
