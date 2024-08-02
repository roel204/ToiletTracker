import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Sidebar = ({ toilets, onSelectToilet, onFilterChange }) => {
    return (
        <View className="flex-1 p-2">
            <ScrollView>
                {toilets.map(toilet => (
                    <TouchableOpacity key={toilet.id} onPress={() => onSelectToilet(toilet)}>
                        <View className="mb-2 p-2 border rounded-md">
                            <Text className="font-bold">{toilet.name}</Text>
                            <Text className="text-sm">{toilet.distance.toFixed(1)} km</Text>
                            <Text className="text-sm">{toilet.accessible ? '♿' : ''} {toilet.unisex ? '⚧' : ''}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Sidebar;
