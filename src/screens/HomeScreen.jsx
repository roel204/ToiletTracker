import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import MapViewComponent from '../components/MapView';
import Sidebar from '../components/Sidebar';
import fetchToilets from '../hooks/fetchToilets';
import * as Location from "expo-location";

const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [toilets, setToilets] = useState([]);
    const [selectedToilet, setSelectedToilet] = useState(null);

    const handleSelectToilet = (toilet) => {
        setSelectedToilet(toilet);
    };

    useEffect(() => {
        // Get permission to track location
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get the location
            let newLocation = await Location.getCurrentPositionAsync({});
            setLocation(newLocation);
            console.log(newLocation)

            // Fetch the toilets
            setToilets(await fetchToilets(newLocation.coords.latitude, newLocation.coords.longitude));
            setLoading(false)
        })();
    }, []);


    return (
        <View className="flex-1">
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                // <ScrollView className="flex-1">
                //     {toilets.map((toilet, index) => (
                //         <View key={index} className="p-2 border-b border-gray-200">
                //             <Text className="text-lg font-bold">{toilet.name}</Text>
                //             <Text>{toilet.street}, {toilet.city}</Text>
                //             <Text>Accessible: {toilet.accessible ? 'Yes' : 'No'}</Text>
                //             <Text>Unisex: {toilet.unisex ? 'Yes' : 'No'}</Text>
                //         </View>
                //     ))}
                // </ScrollView>

                <MapViewComponent toilets={toilets} onSelectToilet={handleSelectToilet} userLocation={location}/>
            )}

            {/*<Sidebar toilets={toilets} onSelectToilet={handleSelectToilet} />*/}
        </View>
    );
};

export default HomeScreen;
