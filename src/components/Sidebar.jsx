import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FilterComponent from "./FilterComponent";

const Sidebar = ({toilets, onSelectToilet, toggleSidebar}) => {
    const navigation = useNavigation();
    const [accessibleFilter, setAccessibleFilter] = useState(false);
    const [unisexFilter, setUnisexFilter] = useState(false);

    const filteredToilets = toilets.filter(toilet => {
        return (
            (!accessibleFilter || toilet.accessible) &&
            (!unisexFilter || toilet.unisex)
        );
    });

    return (
        <View className="flex-1 h-full w-3/4 bg-blue-50 dark:bg-blue-950 border-r-2 border-black">
            <View className="flex-row justify-center h-[10vh] border-b-2 border-black">
                <TouchableOpacity className="p-4 bg-blue-500 rounded-lg" onPress={() => navigation.navigate('Settings')}>
                    <Text className="text-white text-center">Settings</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="p-2">
                {filteredToilets.map(toilet => (
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
            <View className="h-[12vh]">
                <FilterComponent setAccessibleFilter={setAccessibleFilter} setUnisexFilter={setUnisexFilter} accessibleFilter={accessibleFilter} unisexFilter={unisexFilter} />
            </View>
        </View>
    );
};

export default Sidebar;