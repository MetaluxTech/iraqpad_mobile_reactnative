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
import Animated, { FadeInRight, FadeInTop, FadeInBottom, SlideInRight, BounceIn, FadeOutLeft, SlideInLeft, FadeInLeft } from 'react-native-reanimated';
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
  }, [])
  useEffect(() => {
    sliders();
  }, [stories])
  // const fetchData = () => {
  //   // Get Stories From Api
  //   axios.get('https://iraqpad-web.vercel.app/api/story').then((response) => {
  //     setStories(response.data.allStories);

  //   });
  //   // Get Categories From Api
  //   axios.get('https://iraqpad-web.vercel.app/api/category').then((response) => {
  //     SetCategories(response.data)
  //   });
  //   // Get SubCategories From Api
  //   axios.get('https://iraqpad-web.vercel.app/api/subCategory').then((response) => {
  //     SetSubcategory(response.data)
  //     setIsLoading(false)
  //   });

  // }
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
      <View className=' flex-row items-center w-["100%"]  my-8 mx-4 '>

        <Animated.View entering={FadeInLeft.delay(300).springify(300)} className='flex-1 relative'>
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
        </Animated.View>
        <Animated.View entering={FadeInRight.delay(300).springify()}>
          <TouchableOpacity
            onPress={() => router.push('categoriesModals')}
            className=' border-darkgray border rounded-full  h-[50] w-[50] ml-2 flex-row justify-center items-center'>
            <Icon
              name={'options-outline'}
              size={20}
              color={colorScheme == "dark" ? "white" : "darkgray"}

            />
          </TouchableOpacity>
        </Animated.View>

      </View>
      {text.length <= 0 ? (
        <ScrollView>
          {/* Slider Section */}
          <SliderImage sliderIamge={sliderIamge} />
          {/* New Stories */}
          <View className=" px-2 mt-4  mx-1">
            <Animated.Text entering={SlideInRight.delay(500).springify()} className="text-xl pt-3 text-right font-cairoBold dark:text-whitegray">المضافة حديثاً</Animated.Text>
            {/* New Stories slider */}
            <Card stories={stories} />
          </View>
          {/* Best Stories */}
          <View className=" px-2  mt-4  mx-1">
            <Text className=" text-xl py-3 text-right font-cairoBold dark:text-whitegray">قصص مميزة</Text>
            {/* Best Stories slider */}
            <Card stories={sliderIamge} />
          </View>
          <View className='py-4 px-2  flex-col justify-center items-center'>
            <Image
              source={require('../../assets/images/logo.png')}
              className='h-40 mb-3'
            />
            <Text className='text-xl font-cairoRegular text-center text-black dark:text-white w-full'>حيث تعيش القصة</Text>
          </View>
        </ScrollView>
      ) : (
        <View className='px-2 pb-5 flex-1'>
          <Text className='text-xl text-black text-right dark:text-white  font-cairoRegular px-2 pb-2'>نتيجة البحث : </Text>
          <CardByCategory story={searchData} />
        </View>
      )
      }
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </View>
  )
}