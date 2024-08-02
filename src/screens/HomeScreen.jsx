import React, { useState } from 'react';
import { View } from 'react-native';
import MapViewComponent from '../components/MapView';
import Sidebar from '../components/Sidebar';
import useFetchToilets from '../hooks/useFetchToilets';

const HomeScreen = () => {
    const { toilets, loading } = useFetchToilets(42, -74.005974);
    const [selectedToilet, setSelectedToilet] = useState(null);

    const handleSelectToilet = (toilet) => {
        setSelectedToilet(toilet);
    };

    return (
        <View className="flex-1 flex-row">
            <MapViewComponent toilets={toilets} onSelectToilet={handleSelectToilet} />
            <Sidebar toilets={toilets} onSelectToilet={handleSelectToilet} />
        </View>
    );
};

export default HomeScreen;
