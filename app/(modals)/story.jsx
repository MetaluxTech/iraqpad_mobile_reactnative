import { View, Text, Image, StatusBar, FlatList } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { partstory } from '../../common/data';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { Alert } from 'react-native';
export default function index() {
  const {isSignedIn} = useAuth()
  const [addFavorite,setAddFavorite]= useState(false);
  const {title,image,description,rate} = useLocalSearchParams();
  return (
    <View className='flex-1 dark:bg-black '>
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
        <View className="absolute bottom-8 flex-row-reverse justify-between px-4 w-full">
          <Text 
            className=" text-white  text-4xl font-bold "
          >
            {title}
          </Text>
          <View className='flex-row items-center '>
            <Text className='text-white text-lg mr-2'>{rate}</Text>
            <Icon 
              className="" 
              name='star' 
              size={25} 
              color={'yellow'}
            />
          </View>
        </View>
        <View className="absolute top-12 left-0 px-4 flex-row justify-between w-full">
          {/* Back */}
          <TouchableOpacity
            className=""
            onPress={()=>router.back()}
          >
            <Icon 
              className=" bg-white p-3 rounded-full" 
              name='arrow-back-outline' 
              size={20} 
              color={'red'}
            />
          </TouchableOpacity>
          {/* favorite */}
          
          <TouchableOpacity
            onPress={()=>(
              isSignedIn 
              ? setAddFavorite(!addFavorite) 
              :Alert.alert('تنبيه...','يرجى تسجيل الدخول',[
                {text :'cancel'},
                {text :'login',onPress:()=>router.push('(modals)/login')}
              ])
              )}
          >
            <Icon 
              className=" bg-white p-3 rounded-full" 
              name={addFavorite ?'heart':'heart-outline'}  
              size={20} 
              color={'red'}
            />
          </TouchableOpacity>
          
          
        </View>
      </View>
      {/* Parts */}
      <View className="py-3 px-3">
        <Text className="text-2xl font-bold text-black dark:text-white mb-3 mt-5">الفصول</Text>
        <FlatList
          data={partstory}
          inverted={true}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicators={false}
          renderItem={partStory}
        />
        
      </View>
      {/* Content */}
      <View className="px-4 py-5  dark:bg-black mx-2 ">
        <Text className="text-2xl font-bold text-black dark:text-white mb-3">{title}</Text>
        <Text className="text-sm text-darkgray dark:text-whitegray">{description}</Text>
      </View>
      <StatusBar barStyle='light'/>
    </View>
  )
}
const partStory = ({item})=>{
  // console.log(item)
  return(
    <View className="ml-2 ">
      
      <TouchableOpacity
        onPress={()=>router.push({
          pathname: '/partstory',
          params: item
      })}
      >
        <Image
          style={{ height: 80, width: 150, borderRadius: 10 }}
          source={item.image}
          resizeMode='cover'
        />
        <LinearGradient 
        className="absolute bottom-0 w-full h-full rounded-lg"
        colors={['transparent', 'rgba(0,0,0,.9)']}
      />
        <Text className='absolute z-10 bottom-2 right-2 text-white'>{item.title}</Text>
      </TouchableOpacity>
      
    </View>
  )
  
}