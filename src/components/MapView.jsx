import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ toilets, onSelectToilet, userLocation }) => {

    return (
        <View className="flex-1">
            <MapView
                className="flex-1"
                initialRegion={{
                    latitude: userLocation?.coords.latitude || 50,
                    longitude: userLocation?.coords.longitude || 4,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation={true}
                showsCompass={false}
                rotateEnabled={false}
            >
                {toilets.map(toilet => (
                    <Marker
                        key={toilet.id}
                        coordinate={{ latitude: toilet.latitude, longitude: toilet.longitude }}
                        onPress={() => onSelectToilet(toilet)}
                        title={toilet.name}
                        description={`${toilet.street}, ${toilet.city}`}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default MapViewComponent;
