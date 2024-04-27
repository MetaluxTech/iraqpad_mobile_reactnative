import { View, Text, Image, StatusBar, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
export default function index({story}) {
  console.log(story)
  const {title,picture,description} = useLocalSearchParams();
  return (
    <View className='flex-1 dark:bg-black' >
      {/* Image */}
      <View className='relative'>
        <Image
          className="h-[250] w-full"
          source={{uri:picture}}
          resizeMode='cover'
        />
        <LinearGradient 
          className="absolute bottom-0 w-full h-full"
          colors={['transparent', 'rgba(0,0,0,0.9)']}
        />
        {/* <View className="absolute bottom-4 right-3 flex-row-reverse justify-between px-4 w-full">
          <Text className=" text-white py-4 text-right text-2xl font-cairoBold ">
            {story.title}
          </Text>
        </View> */}
        {/* Back Btn */}
        <TouchableOpacity
        className="absolute top-12 left-5 flex-row-reverse"
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
        <ScrollView >
          <Text className="text-2xl  font-cairoBold text-black dark:text-white mb-3">{title}</Text>
          <Text className="text-sm  text-darkgray dark:text-whitegray font-cairoMedium">{description}</Text>
        </ScrollView>
      </View>
      <StatusBar barStyle='light'/>
    </View>
  )
}
