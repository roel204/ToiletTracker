import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import { DarkModeContext } from '../context/DarkModeContext';
import mapStyleDark from '../../assets/mapStyles/mapStyleDark.json';
import mapStyleLight from '../../assets/mapStyles/mapStyleLight.json';

const MapViewComponent = ({toilets, onSelectToilet, userLocation, selectedToilet}) => {
    const { colorScheme } = useContext(DarkModeContext);

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
                provider={"google"}
                showsUserLocation={true}
                showsCompass={false}
                rotateEnabled={false}
                pitchEnabled={false}
                customMapStyle={colorScheme === 'dark' ? mapStyleDark : mapStyleLight}

                region={{
                    latitude: selectedToilet?.latitude,
                    longitude: selectedToilet?.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.02,
                }}
            >
                {toilets.map(toilet => (
                    <Marker
                        key={toilet.id}
                        coordinate={{latitude: toilet.latitude, longitude: toilet.longitude}}
                        opacity={0.8}
                        onPress={() => onSelectToilet(toilet)}
                    >
                        <Callout onPress={() => console.log("Open more info thingy!!!")}>
                            <View className="flex-1 p-2">
                                <Text className="font-bold text-center">{toilet.name}</Text>
                                <Text>{`${toilet.street}, ${toilet.city}`}</Text>

                                <Pressable className="mt-2 bg-blue-400 rounded">
                                    <Text className="m-2 text-center">More Info</Text>
                                </Pressable>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

export default MapViewComponent;
