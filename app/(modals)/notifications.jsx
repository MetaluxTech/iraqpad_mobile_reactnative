import { View, Text, StatusBar } from 'react-native'
import React, { useContext } from 'react'

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