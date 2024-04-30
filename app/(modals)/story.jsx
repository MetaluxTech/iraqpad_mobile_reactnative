import { View, Text, Image, StatusBar, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Alert } from 'react-native';
import axios from 'axios';
import { ThemeContext } from '../../common/ThemeProvider';
export default function index() {
  const {isSignedIn} = useAuth()
  const [addFavorite,setAddFavorite]= useState(false);
  const {title,picture,description,rate,id,created_at} = useLocalSearchParams();
  // Get The Date Of Punlish This Story
  const dateObject = new Date(created_at);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  const[part ,setPart]= useState([]);
  const { colorScheme } = useContext(ThemeContext)
  // Get part Of Story From Api
  useEffect(() =>{
    axios.get(`https://iraqpad-web.vercel.app/api/part?storyId=${id}`).then((response) => {
    const partsForStory = response.data.allParts.filter(part => part.storyId === id);
    setPart(partsForStory);
  });
  },[])
  return (
    <View className='flex-1 dark:bg-black '>
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
        <View className="absolute bottom-4 right-3 flex-row-reverse justify-between px-4 w-full">
          {/* <Text 
            className=" text-white py-4 text-right text-2xl font-cairoBold "
          >
            {title}
          </Text> */}
          {/* <View className='flex-row items-center '>
            <Text className='text-white text-lg mr-2'>{rate}</Text>
            <Icon 
              className="" 
              name='star' 
              size={25} 
              color={'yellow'}
            />
          </View> */}
        </View>
        <View className="absolute top-12 left-0 z-50 px-4 flex-row justify-between w-full">
          {/* Back */}
          <TouchableOpacity
            className="bg-white p-3 rounded-full"
            onPress={()=>router.back()}
          >
            <Icon 
              className=" " 
              name='arrow-back-outline' 
              size={20} 
              color={'red'}
            />
          </TouchableOpacity>
          {/* favorite */}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </View>
      {/* Parts */}
      {part.length>0&&<View className="py-3 px-3 ">
        <Text className="text-2xl text-right font-cairoBold text-black dark:text-white mb-3 mt-5">الفصول</Text>
        <FlatList
          data={part}
          inverted={true}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicators={false}
          renderItem={partStory}
          firstItem={1}
        />
        
      </View>}
      {/* Content */}
      <View className="px-4 py-5  dark:bg-black mx-2 ">
        <Text className="text-2xl font-cairoRegular text-black text-right dark:text-white mb-2">{title}</Text>
        {/* Info Of Story */}
        <View className='my-2 '>
          <Text className='text-sm font-cairoLight text-darkgray text-right dark:text-whitegray'>تم النشر بتاريخ: {formattedDate}</Text>
        </View>
        <Text className="text-sm text-darkgray text-right dark:text-whitegray font-cairoMedium">{description}</Text>
      </View>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </View>
  )
}
const partStory = ({item})=>{
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
          source={{uri:item.picture}}
          resizeMode='cover'
        />
        <LinearGradient 
        className="absolute bottom-0 w-full h-full rounded-lg"
        colors={['transparent', 'rgba(0,0,0,.9)']}
      />
        <Text className='absolute z-10 bottom-2 right-2 text-white font-cairoRegular'>{item.title}</Text>
      </TouchableOpacity>
      
    </View>
  )
  
}