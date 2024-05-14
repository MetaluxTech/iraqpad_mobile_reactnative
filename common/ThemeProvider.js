import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [activePartId, setActivePartId] = useState(null);
    const setActivePart = (partId) => {
        setActivePartId(partId);
    };
    const toggleTheme = () => {
        if (colorScheme === 'light') {
            setColorScheme('dark');
        } else {
            setColorScheme('light');
        }
    }
    useEffect(()=>{
        const fetchStoredId = async () => {
            const storedId = await AsyncStorage.getItem('storedId');
            if (storedId !== null) {
                setActivePartId(JSON.parse(storedId));
            }
        }
        fetchStoredId();
    },[])
    useEffect(() => {
        const storeIdPart = async () => {
            await AsyncStorage.setItem('storedId', JSON.stringify(activePartId));
        }
        storeIdPart();
    }, [activePartId]);
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
        <ThemeContext.Provider value={{ colorScheme, toggleTheme, setActivePart,activePartId }}>
            {children}
        </ThemeContext.Provider>
    )
}
