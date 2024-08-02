import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { storeData, getData } from '../hooks/useLocalStorage';

const SettingsScreen = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(previousState => !previousState);
        storeData('darkMode', !darkMode);
    };

    const deleteData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Data cleared');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View className="flex-1 justify-center items-center p-4 bg-white dark:bg-black">
            <View className="flex-row justify-between items-center w-full mb-4">
                <Text className="text-lg dark:text-white">Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={toggleDarkMode}
                />
            </View>
            <TouchableOpacity
                className="bg-red-500 p-4 rounded-md"
                onPress={deleteData}
            >
                <Text className="text-white">Delete Data</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;
