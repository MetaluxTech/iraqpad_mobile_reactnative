import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const toggleTheme = () => {
        if (colorScheme==='light') {
            setColorScheme('dark');
        } else {
            setColorScheme('light');
        }
    }

    useEffect(() => {
        const fetchStoredTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('themeMode');
            if (storedTheme !== null) {
                setColorScheme(JSON.parse(storedTheme));
            }
        }
        fetchStoredTheme();
    }, []);

    useEffect(() => {
        const storeTheme = async () => {
            await AsyncStorage.setItem('themeMode', JSON.stringify(colorScheme));
        }
        storeTheme();
    }, [colorScheme]);
    return (
        <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
