import { useState, useEffect } from 'react';

const useFetchToilets = (latitude, longitude) => {
    const [toilets, setToilets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToilets = async () => {
            const url = `https://public-bathrooms.p.rapidapi.com/location?lat=${latitude}&lng=${longitude}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '56d75a1da6msh4ae09cbbe3e63f2p124958jsnb15b29e800eb',
                    'x-rapidapi-host': 'public-bathrooms.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setToilets(result);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchToilets();
    }, [latitude, longitude]);

    return { toilets, loading };
};

export default useFetchToilets;
