import { View, Text, Image, StatusBar, FlatList, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../common/ThemeProvider';
export default function index() {
  const { colorScheme } = useContext(ThemeContext)
  const { title, picture, description } = useLocalSearchParams();
  return (
    <View className='flex-1 dark:bg-black' >
      <ScrollView >
        {/* Image */}
        <View className='relative'>
          <Image
            className="h-[250] w-full"
            source={{ uri: picture }}
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
            className="absolute top-12 z-10 left-5 bg-white p-3 rounded-full "
            onPress={() => router.back()}
          >
            <Icon
              className=" "
              name='arrow-back-outline'
              size={20}
              color={'red'}
            />
          </TouchableOpacity>
        </View>
        {/* Content */}
        <View className="px-4 py-5 mt-5  mx-2 flex-1">
          <Text className="text-2xl  font-cairoBold text-black dark:text-white mb-3 pt-4 text-right">{title}</Text>
          <Text className="text-lg  text-darkgray dark:text-whitegray font-cairoMedium text-right">{description}</Text>
        </View>
      </ScrollView>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </View>
  )
}
