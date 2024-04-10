import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { ThemeContext } from '../../common/ThemeProvider';
const notifications = () => {
  const {colorScheme} = useContext(ThemeContext);
  return (
    <View className="flex-1 dark:bg-black">
      <Text className="dark:text-white">notifications</Text>
      <StatusBar style={colorScheme=="dark"? "light": "dark"} />
    </View>
  )
}

export default notifications