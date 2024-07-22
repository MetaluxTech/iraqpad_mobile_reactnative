import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { memo, useContext, useEffect, useState } from 'react'
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
  const [categories, SetCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios.get('https://www.iraqpad.com/api/story').then((response) => {
      const publishedStories = response.data.allStories.filter(story => story.status === 'Published');
      setStories(publishedStories);
    });
    // Get Categories From Api
    axios.get('https://www.iraqpad.com/api/category').then((response) => {
      SetCategories(response.data);
      setIsLoading(false);
    });
  }, [])

  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center dark:bg-black'>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    )
  }
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
        <Text className='text-xl text-black font-cairoBold dark:text-white'> البحث</Text>
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
            className='  border-darkgray font-cairoMedium text-black dark:text-white text-right rounded-xl border px-2 py-3 '
            onChangeText={(text) => dataSearched(text)}
            placeholder='البحث عن قصص'
            placeholderTextColor={colorScheme == "dark" ? "white" : "darkgray"}
            value={text}
          />
        </View>

      </View>
      {text.length > 0 ? (
        <View className='px-2 pb-5 flex-1'>
          <Text className='text-xl text-black text-right dark:text-white  font-cairoRegular px-2 pb-2'>نتيجة البحث  </Text>
          {searchData.length > 0 ? (
            <CardByCategory story={searchData} />
          ) : (
            <View className='flex justify-center items-center'>
              <Text className="font-cairoBold text-red "> اسم القصة المراد البحث عنها غير موجود</Text>
            </View>)}
        </View>
      ) : (
        <View className=" flex-1 mt-3">
          <View className='px-4 w-full '>
            {/* Title Of Category */}
            <Text className='text-xl text-right text-black font-cairoBold dark:text-white'>تصفح الفئات</Text>
          </View>
          <View className=" px-3 flex-1 ">
            <FlatList
              data={categories}
              inverted={false}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicators={false}
              renderItem={({ item }) => (
                <ShowCategoy
                  item={item}
                />
              )}
              firstItem={-1}
              numColumns={2}
              initialNumToRender={2}
              columnWrapperStyle={{ justifyContent: 'space-between', flexDirection: 'row-reverse' }}
            />
          </View>
        </View>
      )}
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} backgroundColor={colorScheme == "dark" ? "#000" : "#E2E8F0"} />
    </View>
  )
}
export default search;
const ShowCategoy = memo(({ item }) => {
  return (
    <View className="w-[48%] my-2">
      <TouchableOpacity
        className='bg-[#3a3a3a] py-5 px-4 rounded-md w-full flex-row justify-center items-center '
        onPress={() => router.push({
          pathname: '/storyByCategory',
          params: item
        })}
      >
        <Text className="font-cairoMedium text-secondary ">{item.title}</Text>
      </TouchableOpacity>
    </View>
  )
})
