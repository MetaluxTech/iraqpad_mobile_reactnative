import { View, Text } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../common/ThemeProvider';
const search = () => {
  const {colorScheme} = useContext(ThemeContext);
  return (
    <View className="flex-1 dark:bg-black">
      <Text className="dark:text-white">search</Text>
      <StatusBar style={colorScheme=="dark"? "light": "dark"} />
    </View>
  )
}

export default search