import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

const Sidebar = ({toilets, onSelectToilet, toggleSidebar}) => {
    return (
        <View className="flex-1 h-full w-3/4 bg-white border-r-2 border-black">
            <View className="h-[10vh] border-b-2 border-black">
                <Text>Settings</Text>
            </View>
            <ScrollView className="p-2">
                {toilets.map(toilet => (
                    <TouchableOpacity key={toilet.id} onPress={() => {
                        onSelectToilet(toilet)
                        toggleSidebar()
                    }}>
                        <View className="mb-2 p-2 border rounded-md">
                            <Text className="font-bold">{toilet.name}</Text>
                            <Text className="text-sm">{toilet.distance.toFixed(1)} km</Text>
                            <Text className="text-sm">{toilet.accessible ? '♿' : ''} {toilet.unisex ? '⚧' : ''}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View className="h-[10vh] border-t-2 border-black">
                <Text>Filters</Text>
            </View>
        </View>
    );
};

export default Sidebar;