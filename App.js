import React, { useEffect, useState } from 'react';
import { Appearance, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { getData } from './src/hooks/useLocalStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    // TODO darkmode!
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
        <SafeAreaView className={`flex-1 ${darkMode ? 'dark' : ''}`}>
            <AppNavigator />
        </SafeAreaView>
    );
};

export default App;
