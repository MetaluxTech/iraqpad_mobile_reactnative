import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ThemeContext = createContext();
export const ThemeProvider =({children})=>{
    const {colorScheme ,setColorScheme} = useColorScheme();
    // const handleThemeChange = async () => {
    //       const storedTheme = await AsyncStorage.getItem('darkmode');
    //       if (storedTheme) {
    //         setColorScheme(storedTheme);
    //       }else{
    //         await AsyncStorage.setItem('darkmode', colorScheme);
    //         setColorScheme(colorScheme)
    //       }
    //   };
    //   useEffect(() => {
    //     handleThemeChange();
    //   }, []);
    return(
        <ThemeContext.Provider value={{colorScheme,setColorScheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
