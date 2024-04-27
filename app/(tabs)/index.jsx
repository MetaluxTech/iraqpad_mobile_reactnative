import { View, Text, Dimensions, FlatList, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import SliderImage from '../../components/SliderImage'
import Card from '../../components/Card'
import { router, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../common/ThemeProvider'
import axios from 'axios'
import { I18nManager } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import CardByCategory from '../../components/CardByCategory'
const IS_RTL = I18nManager.isRTL;
const { height, width } = Dimensions.get('window')
export default function home() {
  const { colorScheme } = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([]);
  const [categories, SetCategories] = useState([])
  const [subcategory, SetSubcategory] = useState([])
  const [sliderIamge, setSliderImage] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    fetchData();
  }, [])
  useEffect(() => {
    sliders();
  }, [stories])
  const fetchData = () => {
    // Get Stories From Api
    axios.get('https://iraqpad-web.vercel.app/api/story').then((response) => {
      setStories(response.data.allStories);

    });
    // Get Categories From Api
    axios.get('https://iraqpad-web.vercel.app/api/category').then((response) => {
      SetCategories(response.data)
    });
    // Get SubCategories From Api
    axios.get('https://iraqpad-web.vercel.app/api/subCategory').then((response) => {
      SetSubcategory(response.data)
      setIsLoading(false)
    });

  }
  // Get story that is slider From Api
  const sliders = () => {
    const sliders = stories.filter(story => story.slider === true)
    setSliderImage(sliders)
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
  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center'>
        <ActivityIndicator size={'large'} color={'red'} />
        <Text className='font-cairoRegular text-black  text-center w-full'>يتم التحميل ...</Text>
      </View>
    )
  }
  return (
    <View className="flex-1 bg-slate-100 dark:bg-black dir">
      <Header />
      <View className='w-["100%"] m-4 relative '>
        <View className='absolute flex-row items-center left-3 top-0 z-10 h-full'>
          <Icon
            name={text.length <= 0 ? 'search' : 'close-outline'}
            size={25}
            color={colorScheme == "dark" ? "white" : "darkgray"}
            onPress={() => setText('')}
          />
        </View>
        <TextInput
          className=' border-darkgray text-black dark:text-white text-right rounded-lg border p-2 w-["100%"]'
          onChangeText={(text) => dataSearched(text)}
          placeholder='البحث عن قصص'
          placeholderTextColor={colorScheme == "dark" ? "white" : "darkgray"}
          value={text}
        />
      </View>
      {text.length <= 0 ? (
        <ScrollView>
          {/* Slider Section */}
          <SliderImage sliderIamge={sliderIamge} />
          {/* Categories Section */}
          <View className="my-4 mx-2 py-5 bg-white dark:bg-blackdark shadow rounded-lg">
            {/* Main Categories */}
            <View className=" px-10 mb-5">
              <FlatList
                horizontal
                inverted={true}
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => (item.id)}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => router.push({
                        pathname: '/storyByCategory',
                        params: item
                      })}
                    >
                      <Text
                        className="font-cairoMedium border-secondary border  text-secondary  px-6 py-3 rounded-md mx-2">
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
            {/* Sub Categories */}
            <FlatList
              horizontal
              inverted={true}
              showsHorizontalScrollIndicator={false}
              data={subcategory}
              keyExtractor={(item) => (item.id)}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => router.push({
                      pathname: '/storyBySubCategory',
                      params: item
                    })}
                  >
                    <Text
                      className="font-cairoRegular bg-secondary text-white  px-4 py-2 rounded-md mr-2">
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          {/* New Stories */}
          <View className=" px-2 my-4 mx-1">
            <Text className="text-xl py-3 font-cairoBold dark:text-whitegray">المضافة حديثاً</Text>
            {/* New Stories slider */}
            <Card stories={stories} />
          </View>
          {/* Best Stories */}
          <View className=" px-2 my-4 mx-1">
            <Text className=" text-xl font-cairoBold dark:text-whitegray">أفضل القصص</Text>
            {/* Best Stories slider */}
            <Card stories={sliderIamge} />
          </View>
          <View className='py-4 px-2  flex-col justify-center items-center'>
            <Image
              source={require('../../assets/images/logo.png')}
              className='w-9 h-20 mb-3'
            />
            <Text className='text-xl font-cairoRegular text-center text-black dark:text-white w-full'>حيث تعيش القصة</Text>
          </View>
        </ScrollView>
      ) : (
        <View className='px-2 pb-5 flex-1'>
          <Text className='text-xl text-black dark:text-white font-cairoRegular px-2 pb-2'>نتيجة البحث : </Text>
          <CardByCategory story={searchData} />
        </View>
      )
      }
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </View>
  )
}