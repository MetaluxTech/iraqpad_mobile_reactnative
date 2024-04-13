import { View, Text, Image, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
export default function index() {
  const {title,image,description} = useLocalSearchParams();
  // console.log(image)
  return (
    <View className='flex-1 dark:bg-black' >
      {/* Image */}
      <View className='relative'>
        <Image
          className="h-[250] w-full"
          source={image}
          resizeMode='cover'
        />
        <LinearGradient 
          className="absolute bottom-0 w-full h-full"
          colors={['transparent', 'rgba(0,0,0,0.9)']}
        />
        <TouchableOpacity
        className="absolute top-12 left-5"
          onPress={()=>router.back()}
        >
          <Icon 
            className=" bg-white p-3 rounded-full" 
            name='arrow-back-outline' 
            size={20} 
            color={'red'}
          />
        </TouchableOpacity>
      </View>
      {/* Content */}
      <View className="px-4 py-5 mt-5  mx-2 ">
        <Text className="text-2xl font-cairoBold text-black dark:text-white mb-3">{title}</Text>
        <Text className="text-sm text-darkgray dark:text-whitegray font-cairoMedium">{description}</Text>
      </View>
      <StatusBar barStyle='light'/>
    </View>
  )
}
