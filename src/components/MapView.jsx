import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import {DarkModeContext} from '../context/DarkModeContext';
import mapStyleDark from '../../assets/mapStyles/mapStyleDark.json';
import mapStyleLight from '../../assets/mapStyles/mapStyleLight.json';
import {useNavigation} from "@react-navigation/native";

const MapViewComponent = ({toilets, userLocation, selectedToilet, setSelectedToilet, movemap, setMoveMap}) => {
    const navigation = useNavigation();
    const {colorScheme} = useContext(DarkModeContext);
    const markerRefs = useRef({});
    const mapRef = useRef(null);

    // Automatically go to toilet & open the Callout if a toilet has been selected
    useEffect(() => {
        if (selectedToilet && markerRefs.current[selectedToilet.id]) {

            // Animate the map to marker position
            if (mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: selectedToilet.latitude,
                    longitude: selectedToilet.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.01,
                }, 400);
            }
            // Show Callout
            markerRefs.current[selectedToilet.id].showCallout();
        }
    }, [selectedToilet, movemap]);

    // Navigate to the detail page
    const viewDetails = () => {
        navigation.navigate('Details', {toilet: selectedToilet});
    }

    return (
        <View className="flex-1">
            <MapView
                className="flex-1"
                ref={mapRef}
                initialRegion={{
                    latitude: userLocation?.coords.latitude || 50,
                    longitude: userLocation?.coords.longitude || 4,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.01,
                }}
                provider={"google"}
                showsUserLocation={true}
                showsCompass={false}
                rotateEnabled={false}
                pitchEnabled={false}
                moveOnMarkerPress={false}
                customMapStyle={colorScheme === 'dark' ? mapStyleDark : mapStyleLight} // Select custom light/dark theme
            >
                {toilets.map(toilet => (
                    // Map each marker on the map
                    <Marker
                        key={toilet.id}
                        coordinate={{latitude: toilet.latitude, longitude: toilet.longitude}}
                        opacity={0.8}
                        isPreselected={true}
                        pinColor={toilet.accessible ? 'blue' : toilet.unisex ? 'purple' : 'red'} // Custom pin colors
                        onPress={() => {
                            // Select the toilet when the marker has been pressed
                            setSelectedToilet(toilet)
                            setMoveMap(!movemap)
                        }}
                        ref={(ref) => {
                            // Refs to open the callouts using code
                            markerRefs.current[toilet.id] = ref;
                        }}
                    >
                        <Callout onPress={viewDetails} tooltip={true}>
                            <View className="flex-1 p-3 bg-bgLight dark:bg-bgDark justify-center items-center rounded-lg border-white border">

                                {/*Name & Location*/}
                                <Text className="text-black dark:text-white font-bold text-center">{toilet.name}</Text>
                                <Text className="text-black dark:text-white">{`${toilet.street}, ${toilet.city}`}</Text>

                                {/*Button to open detail view (Button doesnt do anything, click is handled by the whole callout because buttons dont work in callouts)*/}
                                <TouchableOpacity className="mt-2 w-full bg-blue-400 rounded">
                                    <Text className="text-black dark:text-white m-2 text-center">More Info</Text>
                                </TouchableOpacity>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

export default MapViewComponent;
