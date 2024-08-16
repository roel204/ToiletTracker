import React, {useState, useEffect, useContext} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {getData, storeData, removeData} from '../hooks/useAsyncStorage';
import {Alert, Share, TouchableOpacity} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {DarkModeContext} from "../context/DarkModeContext";

const StarRatingComponent = ({toilet}) => {
    const {colorScheme} = useContext(DarkModeContext);
    const [rating, setRating] = useState(0);

    // Get rating of the current toilet from AsyncStorage
    useEffect(() => {
        (async () => {
            const ratingData = await getData(`rating_${toilet.id}`);
            if (ratingData !== null) {
                setRating(ratingData)
            }
        })();
    }, []);

    // Store new ratings
    useEffect(() => {
        if (rating === 0) {
            removeData(`rating_${toilet.id}`)
        } else {
            storeData(`rating_${toilet.id}`, rating);
        }
    }, [rating]);

    // Share rating
    const shareRating = async () => {
        try {
            await Share.share({
                message: `I rate the toilet in ${toilet.name} ${toilet.city} ${rating} stars. `,
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <>
            <StarRating rating={rating} onChange={setRating} starSize={40} enableHalfStar={false}/>
            <TouchableOpacity className="p-4 rounded-md" onPress={shareRating}>
                <FontAwesome name="share-alt" size={24} color={colorScheme === 'light' ? 'black' : 'white'}/>
            </TouchableOpacity>
        </>
    )
}

export default StarRatingComponent;