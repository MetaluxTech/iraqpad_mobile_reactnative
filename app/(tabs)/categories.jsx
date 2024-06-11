import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import CardByCategory from '../../components/CardByCategory';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../common/ThemeProvider';
import { SelectList } from 'react-native-dropdown-select-list'
import CardAllStory from '../../components/CardAllStory';
const { height, width } = Dimensions.get('window')
export default function Page() {
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
  const [story, setStory] = useState([])
  const [category, setCategory] = useState([])
  const [idCategory, setIdCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [subCategorySelected, setSubCategorySelected] = useState([])
  const { colorScheme } = useContext(ThemeContext)
  useEffect(() => {
    allStory()
    axios.get(`https://iraqpad-web.vercel.app/api/subCategory`).then((response) => {
      setSubCategory(response.data);
    });
    axios.get(`https://iraqpad-web.vercel.app/api/category`).then((response) => {
      setCategory(response.data);
    });
  }, [])
  // Display All Stories 
  const allStory = () => {
    axios.get(`https://iraqpad-web.vercel.app/api/story`).then((response) => {
      setStory(response.data.allStories);
      setIsLoading(false)
    });
  }
  // Display Stories By Category When Clecked On Category Button
  const showStoryByCategory = (selectedTitle) => {
    const selectedCategory = category.find(cat => cat.title === selectedTitle);
    if (selectedCategory) {
      axios.get(`https://www.iraqpad.com/api/story?category=${selectedTitle}`).then((response) => {
        const allData = response.data.allStories.filter(item => item.category.title === selectedTitle);
        setStory(allData);
      });
      setIdCategory(selectedCategory.id);
    }
  }
  // Display Stories By SubCategory When Clecked On SubCategory Button
  const showStoryBySubCategory = (text) => {
    axios.get(`https://www.iraqpad.com/api/story?subcategory=${text}`).then((response) => {
      const allData = response.data.allStories.filter(item => item.subcategory.title === text);
      setStory(allData);
    });
  }
  const subCategorySelected = subCategory.filter(item => item.categoryId === idCategory);
  const subCategoryData = subCategorySelected.map(item => item.title);
  const categoryData = category.map(item => item.title);
  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center'>
        <ActivityIndicator size={'large'} color={'red'} />
        <Text className='font-cairoRegular text-black  text-center w-full'>يتم تحميل القصص ...</Text>
      </View>
    )
  }
  return (
    <View className='flex-1  pt-10  bg-slate-200 dark:bg-black'>
      <View className='px-4 mb-10 mt-5 w-full flex-row-reverse justify-between items-center h-[50px]'>
        {/* Title Of Category */}
        <Text className='text-xl text-black font-cairoBold dark:text-white'>كل القصص</Text>
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
      <View className="flex-row-reverse justify-start w-full px-2 mb-5">
        <TouchableOpacity
          className='ml-2 h-[45px] border-black dark:border-white border px-4 py-2 rounded-lg'
          onPress={allStory}
        >
          <Text
            className="font-cairoMedium text-black dark:text-white "
          >
            الكل
          </Text>
        </TouchableOpacity>
        {/* Choose Category */}
        <SelectList
          inputStyles={{ color: colorScheme == 'dark' ? 'white' : 'black' }}
          dropdownTextStyles={{ color: colorScheme == 'dark' ? 'white' : 'black', textAlign: 'right' }}
          boxStyles={{ flexDirection: 'row-reverse', width: width * 0.32, borderColor: colorScheme == 'dark' ? 'white' : 'black', marginRight: 10 }}
          placeholder='اختر فئة'
          search={false}
          arrowicon={<Icon name='chevron-down-outline' size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />}
          setSelected={(val) => setSelectedCategory(val)}
          data={categoryData}
          onSelect={() => showStoryByCategory(selectedCategory)}
          save="value"
        />
        {/* Choose SubCategory */}
        {story.length > 0 && subCategoryData.length>0&& <SelectList
          inputStyles={{ color: colorScheme == 'dark' ? 'white' : 'black' }}
          dropdownTextStyles={{ color: colorScheme == 'dark' ? 'white' : 'black', textAlign: 'right' }}
          boxStyles={{ flexDirection: 'row-reverse', width: width * 0.40, borderColor: colorScheme == 'dark' ? 'white' : 'black' }}
          placeholder='اختر تصنيف'
          search={false}
          arrowicon={<Icon name='chevron-down-outline' size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />}
          setSelected={(value) => setSelectedSubCategory(value)}
          data={subCategoryData}
          onSelect={() => showStoryBySubCategory(selectedSubCategory)}
          save="value"
        />}
      </View>
      <View className="flex-1 px-2 pb-5">
        {/* <CardAllStory story={story} /> */}
        {story.length > 0 ?(<CardAllStory story={story} />) : (<Text className="font-cairoBold mt-5 text-xl text-center dark:text-white">لا توجد قصص</Text>)}
      </View>
    </View>
  )
}

