// Fetch toilets from the API
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
        const toilets = await response.json();

        // Extra toilet for testing
        const extraToilet = {
            id: "test-toilet-1",
            name: "Test Toilet",
            street: "Test Street 123",
            city: "Vlaardingen",
            latitude: 51.909845,
            longitude: 4.346065,
            accessible: true,
            unisex: false,
            directions: "Located near the test building.",
            comment: "This is a test toilet for development purposes.",
            distance: 0.1,
        };

        // Add test toilet to the array
        toilets.push(extraToilet);

        return toilets;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default fetchToilets;
