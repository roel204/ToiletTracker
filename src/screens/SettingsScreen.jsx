import React, {useContext} from 'react';
import {View, Text, Switch, TouchableOpacity, Alert} from 'react-native';
import {DarkModeContext} from "../context/DarkModeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";

const SettingsScreen = () => {
    const navigation = useNavigation();
    const {colorScheme, toggleDarkMode} = useContext(DarkModeContext);

    const deleteData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Data cleared');
        } catch (e) {
            console.error(e);
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete all data? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: deleteData,
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View className="flex-1 p-5 bg-bgLight dark:bg-bgDark">
            <TouchableOpacity className="absolute top-3 left-3 justify-center items-center h-12 w-12 bg-white rounded-3xl" onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="arrow-left" size={30}/>
            </TouchableOpacity>
            <View className="flex-1 gap-4 pt-14">
                <View className="flex-row items-center justify-between p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                    <Text className="text-black dark:text-white text-lg">Dark Mode</Text>
                    <Switch
                        value={colorScheme === 'dark'}
                        onValueChange={toggleDarkMode}
                    />
                </View>
                <View className="flex-row items-center justify-between p-3 bg-panelLight dark:bg-panelDark rounded-lg">
                    <Text className="text-black dark:text-white text-lg">Delete All Data</Text>
                    <TouchableOpacity className="bg-red-500 p-4 rounded-md" onPress={confirmDelete}><Text className="text-black dark:text-white">DELETE</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SettingsScreen;
