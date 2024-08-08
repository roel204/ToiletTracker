import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, ActivityIndicator, Alert} from 'react-native';
import MapViewComponent from '../components/MapView';
import Sidebar from '../components/Sidebar';
import fetchToilets from '../hooks/fetchToilets';
import * as Location from "expo-location";
import {FontAwesome} from "@expo/vector-icons";

const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState("");

    const [location, setLocation] = useState({});
    const [toilets, setToilets] = useState([]);
    const [selectedToilet, setSelectedToilet] = useState({});

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarAnimation] = useState(new Animated.Value(-300));

    const selectToilet = (toilet) => {
        setSelectedToilet(toilet);
    };

    const toggleSidebar = () => {
        if (sidebarVisible) {
            // Hide sidebar
            Animated.timing(sidebarAnimation, {
                toValue: -300,
                duration: 200,
                useNativeDriver: true,
            }).start(() => setSidebarVisible(false));
        } else {
            // Show sidebar
            setSidebarVisible(true);
            Animated.timing(sidebarAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    useEffect(() => {
        // Get permission to track location
        (async () => {
            setStatusMsg("Getting permission to track location.")
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            // Get the location
            setStatusMsg("Getting your location.")
            let newLocation = await Location.getCurrentPositionAsync({});
            setLocation(newLocation);

            // Fetch the toilets
            setStatusMsg("Finding nearby toilets.")
            await setToilets(await fetchToilets(newLocation.coords.latitude, newLocation.coords.longitude));
            setLoading(false);
        })();
    }, []);

    const reloadToilets = () => {
        (async () => {
            setLoading(true);

            setStatusMsg("Getting your location.")
            let newLocation = await Location.getCurrentPositionAsync({});
            setLocation(newLocation);

            setStatusMsg("Finding nearby toilets.")
            await setToilets(await fetchToilets(newLocation.coords.latitude, newLocation.coords.longitude));
            setLoading(false);
        })();
    }

    return (
        <View className="flex-1 bg-bgLight dark:bg-bgDark">

            {/*Make sure the data is loaded*/}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text className="text-black dark:text-white mt-5">{statusMsg}</Text>
                    <Text className="text-black dark:text-white absolute bottom-5">Disclaimer: Not many toilets known to database.</Text>
                </View>
            ) : (
                <View className="flex-1">
                    {/*Hamburger Button*/}
                    <TouchableOpacity className="absolute justify-center items-center top-3 left-3 z-50 h-12 w-12 bg-white rounded-3xl" onPress={toggleSidebar}>
                        {sidebarVisible ? <FontAwesome name="arrow-left" size={30} color="black" /> : <FontAwesome name="bars" size={30} color="black" />}
                    </TouchableOpacity>

                    {/*MapView*/}
                    <MapViewComponent toilets={toilets} onSelectToilet={selectToilet} userLocation={location} selectedToilet={selectedToilet}/>

                    {/*Sidebar*/}
                    {sidebarVisible && (
                        <Animated.View style={{transform: [{translateX: sidebarAnimation}]}} className="absolute top-0 bottom-0 left-0 right-0 z-40">
                            <Sidebar toilets={toilets} onSelectToilet={selectToilet} toggleSidebar={toggleSidebar} reloadToilets={reloadToilets}/>
                        </Animated.View>
                    )}
                </View>
            )}
        </View>
    );
};

export default HomeScreen;
