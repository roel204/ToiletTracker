const fetchToilets = async (lat, lng) => {
    const url = `https://public-bathrooms.p.rapidapi.com/location?lat=${lat}&lng=${lng}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '56d75a1da6msh4ae09cbbe3e63f2p124958jsnb15b29e800eb',
            'x-rapidapi-host': 'public-bathrooms.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default fetchToilets;
