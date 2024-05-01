import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useUser } from '@clerk/clerk-expo';
import Animated, { FadeInRight,FadeInTop ,FadeInBottom,BounceIn} from 'react-native-reanimated';
export default function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <View className="w-full overflow-hidden shadow rounded-b-2xl bg-white dark:bg-blackdark h-[150px] pt-10 px-4 flex-row-reverse items-center justify-between">
      {isSignedIn &&
        <TouchableOpacity
          onPress={() => router.push('/profile')}
        >
          <Animated.Image entering={FadeInRight.delay(200).springify()} source={{ uri: user.imageUrl }} className='w-[70] h-[70] rounded-full' />
        </TouchableOpacity>
      }
      <Animated.View entering={BounceIn.delay(200).springify()} className=" flex-1 mx-3">
        {isSignedIn ? (
          <Text  className="text-right text-black dark:text-white text-xl font-cairoBold">مرحبا</Text>
        ) : (<Text className="text-right text-black dark:text-white text-xl font-cairoBold">ياهلا بالضيف</Text>)}
        {isSignedIn ? (
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Text  className="text-right text-black dark:text-white text-lg font-cairoRegular">{user.fullName}</Text>
          </TouchableOpacity>
        ) : (
          <Text  className="text-right text-black dark:text-white text-lg font-cairoRegular">سجل دخول وعيش التجربة</Text>)}
      </Animated.View>
      {/* This For notification icon */}
      <View className="h-[50] w-[50] "></View>
    </View>
  )
}