import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data asynchronously.
 *
 * @param {Object} options - The options for the fetch request.
 * @param {Function} options.fetchFn - The function that performs the fetch request.
 * @param {*} [options.initialValue=null] - The initial value for the data state.
 * @returns {Object} - An object containing the fetched data, error, and loading state.
 */
export function useFetch({ fetchFn, initialValue = null}) {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            fetchFn().then((data) => {
                setData(data);
                setLoading(false);
            });
        }   catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [fetchFn]);

    return {
        data,
        error,
        loading
    };
}