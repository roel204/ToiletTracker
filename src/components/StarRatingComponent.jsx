import React, {useState, useEffect} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {getData, storeData, removeData} from '../hooks/useLocalStorage';
import {Alert, Share, Text, TouchableOpacity, View} from "react-native";

const StarRatingComponent = ({toilet}) => {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        (async () => {
            const ratingData = await getData(`rating_${toilet.id}`);
            if (ratingData !== null) {
                setRating(ratingData)
            }
        })();
    }, []);

    useEffect(() => {
        if (rating === 0) {
            removeData(`rating_${toilet.id}`)
        } else {
            storeData(`rating_${toilet.id}`, rating);
        }
    }, [rating]);

    const shareRating = async () => {
        try {
            await Share.share({
                message: `I rate the toilet in ${toilet.name} ${rating} stars. `,
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <View className="flex-1">
            <StarRating rating={rating} onChange={setRating}/>
            <TouchableOpacity className="bg-blue-500 p-4 rounded-md" onPress={shareRating}>
                <Text className="text-white">Share</Text>
            </TouchableOpacity>
        </View>
    )

}

export default StarRatingComponent;