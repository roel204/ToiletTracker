import React, {createContext, useEffect} from 'react';
import {getData, storeData} from '../hooks/useLocalStorage';
import {useColorScheme} from "nativewind";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({children}) => {
    const { colorScheme, setColorScheme } = useColorScheme();

    useEffect(() => {
        const fetchDarkMode = async () => {
            const savedDarkMode = await getData('darkMode');
            if (savedDarkMode !== null) {
                setColorScheme(colorScheme === "light" ? "dark" : "light")
            } else {
                setColorScheme("light")
            }
        };
        fetchDarkMode();
    }, []);

    const toggleDarkMode = () => {
        setColorScheme(colorScheme === "light" ? "dark" : "light")
        storeData('darkMode', colorScheme);
    }

    return (
        <DarkModeContext.Provider value={{colorScheme, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};
