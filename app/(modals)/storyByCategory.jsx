import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import CardByCategory from '../../components/CardByCategory';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../common/ThemeProvider';
import { SelectList } from 'react-native-dropdown-select-list'
const { height, width } = Dimensions.get('window')
export default function Page() {
  const [selected, setSelected] = React.useState("");
  const [story, setStory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const { title, id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true)
  const { colorScheme } = useContext(ThemeContext)
  useEffect(() => {
    allStory()
    // Dispaly All SubCategories In Flatlist
    axios.get(`https://www.iraqpad.com/api/subCategory`).then((response) => {
      const subByCategory = response.data.filter(item => item.categoryId === id);
      setSubCategory(subByCategory);
      setIsLoading(false)
    });
  }, [])
  // Display Stories By SubCategory When Clecked On CubCategory Button
  const dataSearched = (text) => {
    axios.get(`https://www.iraqpad.com/api/story?subcategory=${text}`).then((response) => {
      const allData = response.data.allStories.filter(item => item.subcategory.title === text && item.categoryId === id);
      setStory(allData);
      
    });
  }
  // Display All Stories
  const allStory = () => {
    axios.get(`https://iraqpad-web.vercel.app/api/story?categoryId=${id}`).then((response) => {
      const storyByCategory = response.data.allStories.filter(item => item.categoryId === id);
      setStory(storyByCategory);
    });
  }
  const data = subCategory.map(item => item.title);
  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center'>
        <ActivityIndicator size={'large'} color={'red'} />
        <Text className='font-cairoRegular text-black  text-center w-full'>يتم تحميل ال{title} ...</Text>
      </View>
    )
  }
  return (
    <View className='flex-1  pt-10  bg-slate-200 dark:bg-black'>
      <View className='px-4 mb-10 mt-5 w-full flex-row-reverse justify-between items-center h-[50]'>
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
      {story.length > 0 && !isLoading ?(<View className="flex-row-reverse w-full px-2 mb-5">
        <TouchableOpacity
          className='ml-2 h-[45px] border-black dark:border-white border px-4 py-2 rounded-lg'
          onPress={allStory}
        >
          <Text 
            className="font-cairoMedium  text-black dark:text-white  px-4  "
          >
            الكل
          </Text>
        </TouchableOpacity>
        <SelectList
          inputStyles={{ color: colorScheme == 'dark' ? 'white' : 'black' }}
          dropdownTextStyles={{ color: colorScheme == 'dark' ? 'white' : 'black',textAlign: 'right' }}
          boxStyles={{ flexDirection: 'row-reverse', width: width - 125, borderColor: colorScheme == 'dark' ? 'white' : 'black' }}
          placeholder='اختر تصنيف'
          search={false}
          arrowicon={<Icon
            name='chevron-down-outline'
            size={20}
            color={colorScheme == 'dark' ? 'white' : 'black'}
          />}
          setSelected={(val) => setSelected(val)}
          data={data}
          onSelect={() => dataSearched(selected)}
          save="value"
        />
      </View>):(<Text className="font-cairoBold mt-5 text-xl text-center dark:text-white">لا توجد {title}</Text>)}
      <View className="flex-1 px-2 pb-5">
        <CardByCategory story={story} />
      </View>
    </View>
  )
}

