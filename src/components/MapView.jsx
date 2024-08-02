import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ toilets, onSelectToilet }) => {
    return (
        <View className="flex-1">
            <MapView className="absolute inset-0">
                {toilets.map(toilet => (
                    <Marker
                        key={toilet.id}
                        coordinate={{ latitude: toilet.latitude, longitude: toilet.longitude }}
                        onPress={() => onSelectToilet(toilet)}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default MapViewComponent;
