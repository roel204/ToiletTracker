import React, {useContext} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {DarkModeContext} from '../context/DarkModeContext';
import mapStyleDark from '../../assets/mapStyles/mapStyleDark.json';
import mapStyleLight from '../../assets/mapStyles/mapStyleLight.json';

const ShowLocationComponent = ({toilet}) => {
    const {colorScheme} = useContext(DarkModeContext);

    // Simple map view to show the location in the Detail Screen
    return (
        <View className="flex-1">
            <MapView
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
                    coordinate={{latitude: toilet.latitude, longitude: toilet.longitude}}
                    opacity={0.9}
                    isPreselected={true}
                    pinColor={toilet.accessible ? 'blue' : toilet.unisex ? 'purple' : 'red'} // Custom pin colors
                />
            </MapView>
        </View>
    );
};

export default ShowLocationComponent;
