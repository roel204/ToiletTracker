import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, ActivityIndicator} from 'react-native';
import MapViewComponent from '../components/MapView';
import Sidebar from '../components/Sidebar';
import fetchToilets from '../hooks/fetchToilets';
import * as Location from "expo-location";

const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const [location, setLocation] = useState({});
    const [toilets, setToilets] = useState([]);
    const [selectedToilet, setSelectedToilet] = useState(null);

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarAnimation] = useState(new Animated.Value(-300));

    const handleSelectToilet = (toilet) => {
        setSelectedToilet(toilet);
    };

    const toggleSidebar = () => {
        if (sidebarVisible) {
            // Hide sidebar
            Animated.timing(sidebarAnimation, {
                toValue: -300,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setSidebarVisible(false));
        } else {
            // Show sidebar
            setSidebarVisible(true);
            Animated.timing(sidebarAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
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

            // Fetch the toilets
            setToilets(await fetchToilets(newLocation.coords.latitude, newLocation.coords.longitude));
            setLoading(false);
        })();
    }, []);

    return (
        <View className="flex-1">

            {/*Make sure the data is loaded*/}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text className="text-center mt-2">{errorMsg}</Text>
                </View>
            ) : (
                <View className="flex-1">
                    {/*Hamburger Button*/}
                    <TouchableOpacity className="absolute top-3 left-3 z-50 p-4 bg-white rounded-lg text-4xl" onPress={toggleSidebar}>
                        <Text>{sidebarVisible ? `<` : '☰'}</Text>
                    </TouchableOpacity>

                    {/*MapView*/}
                    <MapViewComponent toilets={toilets} onSelectToilet={handleSelectToilet} userLocation={location} selectedToilet={selectedToilet}/>

                    {/*Sidebar*/}
                    {sidebarVisible && (
                        <Animated.View style={{transform: [{translateX: sidebarAnimation}]}} className="absolute top-0 bottom-0 left-0 right-0 z-40">
                            <Sidebar toilets={toilets} onSelectToilet={handleSelectToilet} toggleSidebar={toggleSidebar} />
                        </Animated.View>
                    )}
                </View>
            )}

        </View>
    );
};

export default HomeScreen;
