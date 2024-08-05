import {useRoute} from '@react-navigation/native';
import {View, Text} from "react-native";

const DetailScreen = () => {
    const route = useRoute();
    const {toilet} = route.params;

    return (
        <View className="flex-1">
            {toilet ? (
                <>
                    <Text>{toilet.name}</Text>
                    <Text>Street: {toilet.street}</Text>
                    <Text>City: {toilet.city}</Text>
                    <Text>Distance: {toilet.distance.toFixed(1)} km</Text>
                    <Text>Accessible: {toilet.accessible ? 'Yes' : 'No'}</Text>
                    <Text>Unisex: {toilet.unisex ? 'Yes' : 'No'}</Text>
                </>
            ) : (
                <Text>No toilet details available: {toilet}</Text>
            )}
        </View>
    );
};

export default DetailScreen;
