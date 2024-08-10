import React, {useEffect, useState} from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {View, Text} from "react-native";
import {getData} from "../hooks/useAsyncStorage";

const starCountComponents = ({toiletId}) => {
    const [rating, setRating] = useState("")

    // Get rating of the current toilet from AsyncStorage
    useEffect(() => {
        (async () => {
            const ratingData = await getData(`rating_${toiletId}`);
            if (ratingData !== null) {
                setRating(ratingData)
            } else {
                setRating("?")
            }
        })();
    }, []);

    return (
        <View className="flex-1 justify-center items-center relative">
            <Text className="absolute text-black z-40">{rating}</Text>
            <FontAwesome name="star" size={30} color="gold"></FontAwesome>
        </View>
    )
}

export default starCountComponents;