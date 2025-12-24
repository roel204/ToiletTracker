// Fetch toilets from the API
const fetchToilets = async (lat, lng) => {
    const url = `https://public-bathrooms.p.rapidapi.com/api/getByCords?lat=${lat}&lng=${lng}&radius=10`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '56d75a1da6msh4ae09cbbe3e63f2p124958jsnb15b29e800eb',
            'x-rapidapi-host': 'public-bathrooms.p.rapidapi.com'
        }
    };

    let toilets = [];

    // Extra toilet for testing
    // const extraToilet = {
    //     id: 6942069,
    //     name: "Test Toilet",
    //     street: "Test Street 123",
    //     city: "Vlaardingen",
    //     latitude: 51.909845,
    //     longitude: 4.346065,
    //     accessible: true,
    //     unisex: false,
    //     directions: "Located near the test building.",
    //     comment: "This is a test toilet for development purposes.",
    //     distance: 0.1,
    // };
    // toilets.push(extraToilet);

    try {
        const response = await fetch(url, options);
        const fetchedToilets = await response.json();

        // Filter the fetched toilets to ensure they have the expected structure
        const validToilets = fetchedToilets.filter(toilet => toilet.id && toilet.name && toilet.latitude && toilet.longitude);

        // Add the fetched toilets to the array
        toilets = toilets.concat(validToilets);
    } catch (error) {
        console.error("Failed to fetch toilets:", error);
    }

    console.log(toilets);

    return toilets;
};

export default fetchToilets;
