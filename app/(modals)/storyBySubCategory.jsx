import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import CardByCategory from '../../components/CardByCategory';
import { ThemeContext } from '../../common/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Page() {
  const [story, setStory] = useState([])
  const { title, id } = useLocalSearchParams();
  const { colorScheme } = useContext(ThemeContext)
  useEffect(() => {
    axios.get(`https://iraqpad-web.vercel.app/api/story?subcategory_id=${id}`).then((response) => {
      const storyByCategory = response.data.allStories.filter(item => item.subcategory_id === id);
      setStory(storyByCategory);
    });
  }, [])
  return (
    <View className='flex-1  pt-10  bg-slate-200 dark:bg-black'>
      <View className='px-4 mb-4 mt-5 w-full flex-row-reverse justify-between items-center h-[40]'>
        {/* Title Of Category */}
        <Text className='text-xl text-black font-cairoBold dark:text-white'>فئة ال{title}</Text>
        {/* Back */}
        <TouchableOpacity
          className="border border-[#333] dark:border-[#585757] p-2 rounded-xl"
          onPress={() => router.back()}
        >
          <Icon
            name='arrow-back-outline'
            size={20}
            color={colorScheme == 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-2 pb-5">
        <CardByCategory story={story} />
      </View>
    </View>
  )
}
