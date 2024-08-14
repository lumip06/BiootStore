import {useState} from "react";

export const invokeFunctions = (functionArray, args) => {
    functionArray.forEach(func => func(args))
}

export const useFetchRequest = () => {
    const [loading, setLoading] = useState(false);

    const apiCall = async (url, method, body, successCallbacks, errorCallbacks, params = {}) => {
        setLoading(true);
        try {
            // Construct query parameters string if any are provided
            const queryString = new URLSearchParams(params).toString();
            const fullUrl = queryString ? `${url}?${queryString}` : url;

            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // Only include the body if the method is not GET or HEAD
            if (method !== 'GET' && method !== 'HEAD') {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(fullUrl, options);
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