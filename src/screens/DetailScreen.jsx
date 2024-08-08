import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import StarRatingComponent from '../components/StarRatingComponent';
import {FontAwesome} from "@expo/vector-icons";

const DetailScreen = ({route, navigation}) => {
    const {toilet} = route.params;


    return (
        <View className="flex-1 p-5 bg-bgLight dark:bg-bgDark">
            <TouchableOpacity className="absolute top-3 left-3 justify-center items-center h-12 w-12 bg-white rounded-3xl" onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="arrow-left" size={30} />
            </TouchableOpacity>
            {toilet ? (
                <View className="flex-1 gap-4 pt-14">
                    <View className="flex-row items-center justify-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <Text className="font-bold">{toilet.name}</Text>
                    </View>
                    <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <FontAwesome name="map-marker" size={24} color="black"/>
                        <Text className="pl-5">{toilet.street + ", " + toilet.city}</Text>
                    </View>
                    <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <FontAwesome name="location-arrow" size={24} color="black"/>
                        <Text className="pl-5">{toilet.directions ? toilet.directions : "No Directions"}</Text>
                    </View>
                    <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <FontAwesome name="comment" size={24} color="black"/>
                        <Text className="pl-5">{toilet.comment ? toilet.comment : "No Comment"}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                            <FontAwesome name="compass" size={24} color="black"/>
                            <Text className="pl-3">{(toilet.distance * 1.60934).toFixed(1)} km</Text>
                        </View>
                        <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                            <FontAwesome name="wheelchair" size={24} color="black"/>
                            <Text className="pl-3">{toilet.accessible ? 'Yes' : 'No'}</Text>
                        </View>
                        <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                            <FontAwesome name="intersex" size={24} color="black"/>
                            <Text className="pl-3">{toilet.unisex ? 'Yes' : 'No'}</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <StarRatingComponent toilet={toilet}/>
                    </View>
                </View>
            ) : (
                <Text>No toilet details available: {toilet}</Text>
            )}
        </View>
    );
};

export default DetailScreen;
