import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../common/ThemeProvider';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import CardByCategory from '../../components/CardByCategory';
const search = () => {
  const { colorScheme } = useContext(ThemeContext);
  const [stories, setStories] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('https://iraqpad-web.vercel.app/api/story').then((response) => {
      setStories(response.data.allStories);
    });
  }, [])
  // Search Data From Api
  const dataSearched = (text) => {
    setText(text)
    const allData = stories.filter(story => {
      return story && story.title && story.title.includes(text)
    });
    if (text.trim().length > 0 && text != ' ') {
      setSearchData(allData)
    }
    else { setSearchData([]) }
  }
  return (
    <View className="flex-1 pt-10 bg-slate-200 dark:bg-black">
      {/* Header Section */}
      <View className='px-4 mt-5 w-full flex-row-reverse justify-between items-center h-[40] '>
        <Text className='text-xl text-black font-cairoBold dark:text-white'>صفحة البحث</Text>
        {/* Close Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className=" border border-[#333] dark:border-[#585757] p-2 rounded-xl"
        >
          <Icon name={'arrow-back-outline'} size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      <View className=' flex-row items-center w-["100%"]  my-8 mx-4 '>
        <View className='flex-1 relative'>
          <Icon
            className=" absolute top-4 left-2 z-10 "
            name={text.length <= 0 ? 'search' : 'close-outline'}
            size={25}
            color={colorScheme == "dark" ? "white" : "darkgray"}
            onPress={() => setText('')}
          />
          <TextInput
            className='  border-darkgray text-black dark:text-white text-right rounded-xl border px-2 py-3 '
            onChangeText={(text) => dataSearched(text)}
            placeholder='البحث عن قصص'
            placeholderTextColor={colorScheme == "dark" ? "white" : "darkgray"}
            value={text}
          />
        </View>
        {/* <View>
          <TouchableOpacity
            onPress={() => router.push('categoriesModals')}
            className=' border-darkgray border rounded-full  h-[50] w-[50] ml-2 flex-row justify-center items-center'>
            <Icon
              name={'options-outline'}
              size={20}
              color={colorScheme == "dark" ? "white" : "darkgray"}
            />
          </TouchableOpacity>
        </View> */}
      </View>
      {text.length > 0 ? (
        <View className='px-2 pb-5 flex-1'>
          <Text className='text-xl text-black text-right dark:text-white  font-cairoRegular px-2 pb-2'>نتيجة البحث  </Text>
          {searchData.length > 0 ? (
            <CardByCategory story={searchData} />
          ) : (
            <View className='flex justify-center items-center'>
              <Text className="font-cairoBold text-red dark:text-white"> اسم القصة المراد البحث عنها غير موجود</Text>
            </View>)}
        </View>
      ) : (
        <View className='flex justify-center items-center'>
          <Text className="font-cairoBold text-black dark:text-white">اكتب اسم القصة المراد البحث عنها</Text>
        </View>
      )}
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </View>
  )
}

export default search