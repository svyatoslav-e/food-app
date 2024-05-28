import { useState, useEffect, useCallback } from "react";

async function sendHTTPRequest(url, config) {
  const response = await fetch(url, config);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
}

/**
 * Custom hook for making HTTP requests.
 *
 * @param {string} url - The URL to send the HTTP request to.
 * @param {object} config - The configuration object for the HTTP request.
 * @param {*} initialValue - The initial value for the data state.
 * @returns {object} - An object containing the data, error, loading, and sendRequest function.
 */
export default function useHttp(url, config, initialValue = null) {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function clearData() {
        setData(initialValue);
    }

    /**
     * Sends an HTTP request using the provided URL and config.
     */
    const sendRequest = useCallback(async function sendRequest(dataBody) {
        setLoading(true);
        try {
            const data = await sendHTTPRequest(url, {...config, body: JSON.stringify(dataBody)});
            console.log(data)
            setData(data);
        } catch (error) {
            setError(error.message || 'An error occurred');
        }
        setLoading(false);
    }, [url, config]);

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        error,
        loading,
        sendRequest,
        clearData
    };
}