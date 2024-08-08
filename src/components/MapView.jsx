import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import { DarkModeContext } from '../context/DarkModeContext';
import mapStyleDark from '../../assets/mapStyles/mapStyleDark.json';
import mapStyleLight from '../../assets/mapStyles/mapStyleLight.json';
import {useNavigation} from "@react-navigation/native";

const MapViewComponent = ({toilets, onSelectToilet, userLocation, selectedToilet}) => {
    const navigation = useNavigation();
    const { colorScheme } = useContext(DarkModeContext);

    const viewDetails = () => {
        navigation.navigate('Details', { toilet: selectedToilet });
    }

    // Ensure toilets is always an array before mapping
    const safeToilets = Array.isArray(toilets) ? toilets : [];

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
                {safeToilets.map(toilet => (
                    <Marker
                        key={toilet.id}
                        coordinate={{latitude: toilet.latitude, longitude: toilet.longitude}}
                        opacity={0.8}
                        pinColor={toilet.accessible ? 'blue' : toilet.unisex ? 'purple' : 'red'}
                        onPress={() => onSelectToilet(toilet)}
                    >
                        <Callout onPress={viewDetails} tooltip={true}>
                            <View className="flex-1 p-3 bg-bgLight dark:bg-bgDark justify-center items-center rounded-lg border-white border">
                                <Text className="text-black dark:text-white font-bold text-center">{toilet.name}</Text>
                                <Text className="text-black dark:text-white">{`${toilet.street}, ${toilet.city}`}</Text>

                                <TouchableOpacity className="mt-2 bg-blue-400 rounded">
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
