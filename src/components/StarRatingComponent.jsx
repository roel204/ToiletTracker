import React, {useState, useEffect} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {getData, storeData} from '../hooks/useLocalStorage';

const StarRatingComponent = ({toilet}) => {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        (async () => {
            const ratingData = await getData(`rating_${toilet.id}`);
            setRating(ratingData)
        })();
    }, []);

    useEffect(() => {
        storeData(`rating_${toilet.id}`, rating);
    }, [rating]);

    return (
        <StarRating
            rating={rating}
            onChange={setRating}
        />
    )
}

export default StarRatingComponent;