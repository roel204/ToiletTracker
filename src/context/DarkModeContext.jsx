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
                setColorScheme(savedDarkMode)
            } else {
                setColorScheme("light")
            }
        };
        fetchDarkMode();
    }, []);

    const toggleDarkMode = () => {
        const newScheme = colorScheme === "light" ? "dark" : "light";
        setColorScheme(newScheme);
        storeData('darkMode', newScheme);
    }

    return (
        <DarkModeContext.Provider value={{colorScheme, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};
