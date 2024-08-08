import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FilterComponent from "./FilterComponent";
import { FontAwesome } from '@expo/vector-icons';

const Sidebar = ({toilets, onSelectToilet, toggleSidebar, reloadToilets}) => {
    const navigation = useNavigation();
    const [accessibleFilter, setAccessibleFilter] = useState(false);
    const [unisexFilter, setUnisexFilter] = useState(false);

    const filteredToilets = (Array.isArray(toilets) ? toilets : []).filter(toilet => {
        return (
            (!accessibleFilter || toilet.accessible) &&
            (!unisexFilter || toilet.unisex)
        );
    });

    return (
        <View className="flex-1 h-full w-3/4 bg-blue-50 dark:bg-blue-950 border-r-2 border-black">
            <View className="flex-row justify-between h-[10vh] border-b-2 border-black">
                <View  className="justify-center top-3 h-12 w-12 rounded-3xl"/>
                <TouchableOpacity className="justify-center items-center top-3 h-12 w-12 bg-white rounded-3xl" onPress={() => navigation.navigate('Settings')}>
                    <FontAwesome name="gear" size={30} />
                </TouchableOpacity>
                <TouchableOpacity className="justify-center items-center top-3 right-3 h-12 w-12 bg-white rounded-3xl" onPress={reloadToilets}>
                    <FontAwesome name="rotate-right" size={30} color="black" />
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
                            <Text className="text-sm">{(toilet.distance * 1.60934).toFixed(1)} km</Text>
                            <Text className="text-sm">{toilet.accessible ? '♿' : ''} {toilet.unisex ? '⚧' : ''}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View className="h-[12vh]">
                <FilterComponent setAccessibleFilter={setAccessibleFilter} setUnisexFilter={setUnisexFilter} accessibleFilter={accessibleFilter} unisexFilter={unisexFilter}/>
            </View>
        </View>
    );
};

export default Sidebar;