import React, {useEffect} from 'react';
import {getData, storeData} from '../hooks/useLocalStorage';
import {Switch, View} from "react-native";

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
        <View className='flex-1'>
            <Switch
                value={accessibleFilter}
                onValueChange={toggleAccessibleFilter}
            />
            <Switch
                value={unisexFilter}
                onValueChange={toggleUnisexFilter}
            />
        </View>
    )

}

export default FilterComponent;