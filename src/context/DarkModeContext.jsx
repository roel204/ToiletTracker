import React, {createContext, useEffect} from 'react';
import {getData, storeData} from '../hooks/useAsyncStorage';
import {useColorScheme} from "nativewind";
import {StatusBar} from "react-native";

// Context to manage Dark Mode (Make sure tailwind.config.js has "darkMode: 'selector',")
export const DarkModeContext = createContext();

export const DarkModeProvider = ({children}) => {
    const {colorScheme, setColorScheme} = useColorScheme();

    // Get the Dark Mode setting from AsyncStorage
    useEffect(() => {
        const fetchDarkMode = async () => {
            const savedDarkMode = await getData('darkMode');
            if (savedDarkMode !== null) {
                setColorScheme(savedDarkMode)
            } else {
                setColorScheme("light")
            }
        };
        fetchDarkMode();
    }, []);

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        const newScheme = colorScheme === "light" ? "dark" : "light";
        setColorScheme(newScheme);
        storeData('darkMode', newScheme);
    }

    // Return the current colorScheme and toggle function to be used by the children
    return (
        <DarkModeContext.Provider value={{colorScheme, toggleDarkMode}}>
            {/*Change the color of the staus bar*/}
            <StatusBar
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colorScheme === 'dark' ? '#1e293b' : '#eff6ff'}
            />
            {children}
        </DarkModeContext.Provider>
    );
};
