import React, { useContext, useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { DarkModeContext } from '../context/DarkModeContext';
import mapStyleDark from '../../assets/mapStyles/mapStyleDark.json';
import mapStyleLight from '../../assets/mapStyles/mapStyleLight.json';
import * as Location from 'expo-location';

const ShowLocationComponent = ({ toilet }) => {
    const { colorScheme } = useContext(DarkModeContext);
    const mapRef = useRef(null);

    useEffect(() => {
        let locationSubscription;

        // Watch the user's location to update the size of the map as they walk closer
        const startWatchingLocation = async () => {
            // Get permission to track location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Start tracking the user's location
            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (userLocation) => {
                    // Fit the map to user location and toilet pin
                    if (mapRef.current) {
                        mapRef.current.fitToCoordinates(
                            [
                                { latitude: toilet.latitude, longitude: toilet.longitude },
                                { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
                            ],
                            {
                                edgePadding: { top: 45, right: 30, bottom: 20, left: 45 },
                                animated: true,
                            }
                        );
                    }
                }
            );
        };

        startWatchingLocation();

        // Clean up the location subscription on unmount
        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, [toilet]);

    return (
        <View className="flex-1">
            <MapView
                ref={mapRef}
                className="flex-1"
                initialRegion={{
                    latitude: toilet.latitude,
                    longitude: toilet.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.02,
                }}
                provider={"google"}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={false}
                rotateEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
                customMapStyle={colorScheme === 'dark' ? mapStyleDark : mapStyleLight} // Select custom light/dark theme
            >
                <Marker
                    coordinate={{ latitude: toilet.latitude, longitude: toilet.longitude }}
                    opacity={0.9}
                    pinColor={toilet.accessible ? 'blue' : toilet.unisex ? 'purple' : 'red'} // Custom pin colors
                />
            </MapView>
        </View>
    );
};

export default ShowLocationComponent;
