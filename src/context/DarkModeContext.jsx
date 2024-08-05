import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import {getData, storeData} from '../hooks/useLocalStorage';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
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

    const changeDarkMode = () => {
        setDarkMode(!darkMode);
        storeData('darkMode', !darkMode);
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, changeDarkMode }} className={`flex-1 ${darkMode ? 'dark' : ''}`}>
            {children}
        </DarkModeContext.Provider>
    );
};
