import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error(e);
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(e);
    }
};
