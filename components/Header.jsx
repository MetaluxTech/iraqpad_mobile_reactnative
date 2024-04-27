import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
export default function Header() {

    // const dataSearhed = (text)=>{
    //   // const url =`https://iraqpad-web.vercel.app/api/story?q=${text}`
    //     axios.get(`https://iraqpad-web.vercel.app/api/story?q=${text}`).then((response) => {
    //     let allData = response.data.allStories;
    //     if(allData){
    //       setSearchData(allData)
    //     }
    //     });
    // }
  return (
    <View className=" relative ">
      <Image 
        className=" w-full h-[180px] top-0 " 
        source={require('../assets/images/homebg.jpg')}
      />
      <LinearGradient
          className="absolute bottom-0 w-full h-full"
          colors={['transparent', 'rgba(0,0,0,.9)']}
      />
      <View className='px-5  flex-row-reverse justify-between items-center pt-12  absolute w-full h-full'>
        <Image 
          source={require('../assets/images/logo.png')}
          className='w-9 h-20'
        />
        <View className='flex-row'>
          {/* Search Btn */}
          {/* <TextInput 
            className='w-full border border-white p-2 text-white'
            placeholder='search data' 
            onChangeText={(text)=>dataSearhed(text)}/> */}
          {/* <TouchableOpacity 
            onPress={()=>router.push('search')}
            className="border border-white p-2 rounded-full mr-2"
          >
            <Icon name='search' size={20} color={'white'}/>
          </TouchableOpacity> */}
          {/* Notifications Btn */}
          {/* <TouchableOpacity 
            onPress={()=>router.push('notifications')}
            className="border border-white p-2 rounded-full"
          >
            <Icon name='notifications' size={20} color={'white'}/>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}