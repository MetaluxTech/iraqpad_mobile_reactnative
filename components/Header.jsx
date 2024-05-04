import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../common/ThemeProvider';
import { router } from 'expo-router';

export default function Header() {
  const { colorScheme } = useContext(ThemeContext)
  return (
    <View className="w-full overflow-hidden shadow rounded-b-2xl bg-white dark:bg-blackdark h-[150px] pt-8 px-4 flex-row-reverse items-center justify-between">
      <View className=' py-1'>
        <Image source={require("../assets/images/logo.png")} />
      </View>
      {/* This For another icon */}
      <TouchableOpacity
        onPress={() => router.push('/settings')}
        className="border border-[#333] dark:border-[#585757] p-2 rounded-full">
        <Icon name={'settings-outline'} size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
      </TouchableOpacity>
    </View>
  )
}