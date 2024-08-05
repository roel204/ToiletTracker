import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import {DarkModeContext} from "../context/DarkModeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

const SettingsScreen = () => {
    const navigation = useNavigation();
    const { colorScheme, toggleDarkMode } = useContext(DarkModeContext);

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
            <TouchableOpacity className="absolute top-3 left-3 p-4 bg-blue-500 rounded-lg" onPress={() => navigation.navigate('Home')}>
                <Text className="text-white text-center">Home</Text>
            </TouchableOpacity>
            <View className="flex-row justify-between items-center w-full mb-4">
                <Text className="text-lg dark:text-white">Dark Mode</Text>
                <Switch
                    value={colorScheme === 'dark'}
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
