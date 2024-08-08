import React, {useState, useEffect} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {getData, storeData, removeData} from '../hooks/useLocalStorage';
import {Alert, Share, TouchableOpacity} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

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
        <>
            <StarRating className="" rating={rating} onChange={setRating} starSize={40}/>
            <TouchableOpacity className="p-4 rounded-md" onPress={shareRating}>
                <FontAwesome name="share-alt" size={24} color="black" />
            </TouchableOpacity>
        </>
    )
}

export default StarRatingComponent;