import { useState } from "react";
import {useBoundStore} from "../stores/BoundStore";

export const invokeFunctions = (functionArray, args) => {
    functionArray.forEach(func => func(args));
}

export const useFetchRequest = () => {
    // const [loading, setLoading] = useState(false);
    const { getToken} = useBoundStore();
    const apiCall = async (url, method, body, successCallbacks, errorCallbacks,finallyCallbacks, token = getToken()) => {
        // setLoading(true);
        try {

            const headers = {
                'Content-Type': 'application/json',
            };


            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const options = {
                method,
                headers,
            };


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
            if (finallyCallbacks && finallyCallbacks.length) {
                invokeFunctions(finallyCallbacks, false);
            }
            // setLoading(false);
        }
    };

    // return { apiCall, loading };
    return { apiCall};
}
