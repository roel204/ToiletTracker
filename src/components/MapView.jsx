import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ toilets, onSelectToilet, userLocation }) => {
    return (
        <View className="flex-1">
            <MapView
                className="flex-1"
                initialRegion={{
                    latitude: userLocation?.latitude || 0,
                    longitude: userLocation?.longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}  // Show user's location on the map
            >
                {toilets.map(toilet => (
                    <Marker
                        key={toilet.id}
                        coordinate={{ latitude: toilet.latitude, longitude: toilet.longitude }}
                        onPress={() => onSelectToilet(toilet)}
                        title={toilet.name}  // Optional: Display the name on the marker
                        description={`${toilet.street}, ${toilet.city}`}  // Optional: Display the address on the marker
                    />
                ))}
            </MapView>
        </View>
    );
};

export default MapViewComponent;
