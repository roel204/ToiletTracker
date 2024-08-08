import React, {useEffect} from 'react';
import {getData, storeData} from '../hooks/useLocalStorage';
import {Switch, Text, View} from "react-native";

const FilterComponent = ({accessibleFilter, setAccessibleFilter, unisexFilter, setUnisexFilter}) => {

    useEffect(() => {
        (async () => {
            const accessibleFilterData = await getData('accessibleFilter');
            const unisexFilterData = await getData('unisexFilter');
            setAccessibleFilter(accessibleFilterData);
            setUnisexFilter(unisexFilterData);
        })()
    }, []);

    const toggleAccessibleFilter = () => {
        setAccessibleFilter(!accessibleFilter);
        storeData('accessibleFilter', !accessibleFilter);
    }

    const toggleUnisexFilter = () => {
        setUnisexFilter(!unisexFilter);
        storeData('unisexFilter', !unisexFilter);
    }

    return (
        <View className="flex-1 flex-row justify-evenly items-center border-t-2 border-black">
            <View className="flex-1 w-24 items-center">
                <Text className="text-black dark:text-white text-center font-bold">Accessible</Text>
                <Switch
                    // trackColor={{false: '#1e293b', true: '#06b6d4'}}
                    // thumbColor={accessibleFilter ? '#22d3ee' : '#334155'}
                    value={accessibleFilter}
                    onValueChange={toggleAccessibleFilter}
                />
            </View>
            <View className="flex-1 w-24 items-center">
                <Text className="text-black dark:text-white text-center font-bold">Unisex</Text>
                <Switch
                    // trackColor={{false: '#1e293b', true: '#06b6d4'}}
                    // thumbColor={unisexFilter ? '#22d3ee' : '#334155'}
                    value={unisexFilter}
                    onValueChange={toggleUnisexFilter}
                />
            </View>
        </View>
    );
}

export default FilterComponent;