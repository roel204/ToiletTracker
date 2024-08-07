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
                <Text className="text-center font-bold">Accessible</Text>
                <Switch
                    value={accessibleFilter}
                    onValueChange={toggleAccessibleFilter}
                />
            </View>
            <View className="flex-1 w-24 items-center">
                <Text className="text-center font-bold">Unisex</Text>
                <Switch
                    value={unisexFilter}
                    onValueChange={toggleUnisexFilter}
                />
            </View>
        </View>
    );
}

export default FilterComponent;