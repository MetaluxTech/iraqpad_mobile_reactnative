import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios';

export default function Page() {
  // const [story , setStory] = useState([])
  // const {title,id} = useLocalSearchParams();
  // console.log(id)
  // console.log(story)
  // useEffect(() =>{
  //   axios.get(`https://iraqpad-web.vercel.app/api/story?categoryId=${id}`).then((response) => {
  //   const storyByCategory = response.data.allStories.filter(item => item.categoryId === id);
  //   setStory(storyByCategory);
  // });
  // },[])
  return (
    <View className='flex-1 items-center justify-center bg-slate-200 dark:bg-black'>
      {/* <Text className='text-black'>title category : {title}</Text> */}
      {/* <FlatList
          data={story}
          inverted={true}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicators={false}
          renderItem={partStory}
          firstItem={1}
        /> */}
    </View>
  )
}

const partStory = ({item})=>{
  return(
    <View className="ml-2 flex-1 justify-center">
      
      <TouchableOpacity
        // onPress={()=>router.push({
        //   pathname: '/partstory',
        //   params: item
        // })}
      >
        <Image
          style={{ height: 80, width: 150, borderRadius: 10 }}
          source={{uri:item.picture}}
          resizeMode='cover'
        />
        {/* <LinearGradient 
        className="absolute bottom-0 w-full h-full rounded-lg"
        colors={['transparent', 'rgba(0,0,0,.9)']}
      /> */}
        <Text className='absolute z-10 bottom-2 right-2 text-white font-cairoRegular'>{item.title}</Text>
      </TouchableOpacity>
      
    </View>
  )
  
}