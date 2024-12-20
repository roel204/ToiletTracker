import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Animated, Alert} from 'react-native';
import MapViewComponent from '../components/MapView';
import Sidebar from '../components/Sidebar';
import fetchToilets from '../hooks/fetchToilets';
import * as Location from "expo-location";
import {FontAwesome} from "@expo/vector-icons";
import LoadingView from "../components/LoadingView";

const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState("");

    const [location, setLocation] = useState({});
    const [toilets, setToilets] = useState([]);
    const [selectedToilet, setSelectedToilet] = useState({});
    const [moveMap, setMoveMap] = useState(0)

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarAnimation] = useState(new Animated.Value(-300));

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

    // useEffect to initialize the app, also set status message to show progress to the user
    useEffect(() => {
        (async () => {
            try {
                // Get permission to track location
                setStatusMsg("Getting permission to track location.");
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission to access location was denied');
                    return;
                }

                // Get the location
                setStatusMsg("Getting your location.");
                let newLocation = await Location.getCurrentPositionAsync({});
                setLocation(newLocation);

                // Fetch the toilets
                setStatusMsg("Finding nearby toilets.");
                const toilets = await fetchToilets(newLocation.coords.latitude, newLocation.coords.longitude);
                setToilets(toilets);

            } catch (error) {
                console.error('Error during initialization:', error);
                Alert.alert('Something went wrong', 'We were unable to initialize the app. Please try again later.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    // Reload the toilets
    const reloadToilets = () => {
        (async () => {
            setLoading(true);

            // Get the location again
            setStatusMsg("Getting your location.")
            let newLocation = await Location.getCurrentPositionAsync({});
            setLocation(newLocation);

            // Get the toilets again
            setStatusMsg("Finding nearby toilets.")
            await setToilets(await fetchToilets(newLocation.coords.latitude, newLocation.coords.longitude));
            setLoading(false);
        })();
    }

    return (
        <View className="flex-1 bg-bgLight dark:bg-bgDark">

            {/*Loading screen*/}
            {loading ? (
                <LoadingView statusMsg={statusMsg} />
            ) : (
                <View className="flex-1">
                    {/*Hamburger Button*/}
                    <TouchableOpacity className="absolute justify-center items-center top-3 left-3 z-50 h-12 w-12 bg-white rounded-3xl" onPress={toggleSidebar}>
                        {sidebarVisible ? <FontAwesome name="arrow-left" size={30} color="black"/> : <FontAwesome name="bars" size={30} color="black"/>}
                    </TouchableOpacity>

                    {/*MapView*/}
                    <MapViewComponent toilets={toilets} userLocation={location} selectedToilet={selectedToilet} setSelectedToilet={setSelectedToilet} movemap={moveMap} setMoveMap={setMoveMap}/>

                    {/*Sidebar*/}
                    {sidebarVisible && (
                        <Animated.View style={{transform: [{translateX: sidebarAnimation}]}} className="absolute top-0 bottom-0 left-0 right-0 z-40">
                            <Sidebar toilets={toilets} toggleSidebar={toggleSidebar} reloadToilets={reloadToilets} setSelectedToilet={setSelectedToilet} movemap={moveMap} setMoveMap={setMoveMap}/>
                        </Animated.View>
                    )}
                </View>
            )}
        </View>
    );
};

export default HomeScreen;
