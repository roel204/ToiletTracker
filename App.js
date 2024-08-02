import React, { useEffect, useState } from 'react';
import { Appearance, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { getData } from './src/hooks/useLocalStorage';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchDarkMode = async () => {
            const savedDarkMode = await getData('darkMode');
            if (savedDarkMode !== null) {
                setDarkMode(savedDarkMode);
            } else {
                const colorScheme = Appearance.getColorScheme();
                setDarkMode(colorScheme === 'dark');
            }
        };
        fetchDarkMode();
    }, []);

    return (
        <View className={`flex-1 ${darkMode ? 'dark' : ''}`}>
            <AppNavigator />
        </View>
    );
};

export default App;
