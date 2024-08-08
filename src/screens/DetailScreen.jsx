import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import StarRatingComponent from '../components/StarRatingComponent';
import {FontAwesome} from "@expo/vector-icons";
import {DarkModeContext} from "../context/DarkModeContext";

const DetailScreen = ({route, navigation}) => {
    const {colorScheme} = useContext(DarkModeContext);
    const {toilet} = route.params;

    return (
        <View className="flex-1 p-5 bg-bgLight dark:bg-bgDark">

            {/*Back button*/}
            <TouchableOpacity className="absolute top-3 left-3 justify-center items-center h-12 w-12 bg-white rounded-3xl" onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="arrow-left" size={30}/>
            </TouchableOpacity>

            {toilet ? (
                <View className="flex-1 gap-4 pt-14">

                    {/*Name*/}
                    <View className="flex-row items-center justify-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <Text className="text-black dark:text-white font-bold">{toilet.name}</Text>
                    </View>

                    {/*Location*/}
                    <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <FontAwesome name="map-marker" size={24} color={colorScheme === 'light' ? 'black' : 'white'}/>
                        <Text className="text-black dark:text-white pl-5">{toilet.street + ", " + toilet.city}</Text>
                    </View>

                    {/*Directions*/}
                    <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <FontAwesome name="location-arrow" size={24} color={colorScheme === 'light' ? 'black' : 'white'}/>
                        <Text className="text-black dark:text-white pl-5">{toilet.directions ? toilet.directions : "No Directions"}</Text>
                    </View>

                    {/*Comment*/}
                    <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <FontAwesome name="comment" size={24} color={colorScheme === 'light' ? 'black' : 'white'}/>
                        <Text className="text-black dark:text-white pl-5">{toilet.comment ? toilet.comment : "No Comment"}</Text>
                    </View>

                    <View className="flex-row justify-between">

                        {/*Distance in KM*/}
                        <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                            <FontAwesome name="compass" size={24} color={colorScheme === 'light' ? 'black' : 'white'}/>
                            <Text className="text-black dark:text-white pl-3">{(toilet.distance * 1.60934).toFixed(1)} km</Text>
                        </View>

                        {/*Accessibe*/}
                        <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                            <FontAwesome name="wheelchair" size={24} color={colorScheme === 'light' ? 'black' : 'white'}/>
                            <Text className="text-black dark:text-white pl-3">{toilet.accessible ? 'Yes' : 'No'}</Text>
                        </View>

                        {/*Unisex*/}
                        <View className="flex-row items-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                            <FontAwesome name="intersex" size={24} color={colorScheme === 'light' ? 'black' : 'white'}/>
                            <Text className="text-black dark:text-white pl-3">{toilet.unisex ? 'Yes' : 'No'}</Text>
                        </View>
                    </View>

                    {/*Star rating component*/}
                    <View className="flex-row items-center justify-center p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                        <StarRatingComponent toilet={toilet}/>
                    </View>
                </View>
            ) : (
                // Fallback if no toilet was found
                <Text>No toilet details available: {toilet}</Text>
            )}
        </View>
    );
};

export default DetailScreen;
