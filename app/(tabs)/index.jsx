import { View, Text, Dimensions, FlatList, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import SliderImage from '../../components/SliderImage'
import Card from '../../components/Card'
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../../common/ThemeProvider';
import axios from 'axios';
import { I18nManager } from "react-native";
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
const { height, width } = Dimensions.get('window')
export default function home() {
  const { colorScheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [categories, SetCategories] = useState([]);
  const [subcategory, SetSubcategory] = useState([]);
  const [sliderIamge, setSliderImage] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    sliders();
  }, [stories])
  useEffect(() => {
    const fetchNewStories = () => {
      fetchData()
    };
    fetchNewStories();
  }, [stories]);
  const fetchData = () => {
    // Get Stories From Api
    axios.get('https://www.iraqpad.com/api/story').then((response) => {
      setStories(response.data.allStories);
    });
    // Get Categories From Api
    axios.get('https://www.iraqpad.com/api/category').then((response) => {
      SetCategories(response.data)
    });
    // Get SubCategories From Api
    axios.get('https://www.iraqpad.com/api/subCategory').then((response) => {
      SetSubcategory(response.data)
      setIsLoading(false)
    });
  }
  // Get story that is slider From Api
  const sliders = () => {
    const sliders = stories.filter(story => story.slider === true)
    setSliderImage(sliders)
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
      <ScrollView>
        <Header />
        <View className='mt-10'>
          {/* Slider Section */}
          {/* <SliderImage sliderIamge={sliderIamge} /> */}
          {/* New Stories */}
          <View className=" px-2 mt-4  mx-1">
            <Text className="text-xl pt-3 text-right font-cairoBold dark:text-whitegray">المضافة حديثاً</Text>
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
              className=' mb-3'
            />
            <Text className='text-xl font-cairoRegular text-center text-black dark:text-white w-full'>حيث تعيش القصة</Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"}  backgroundColor={colorScheme == "dark" ? "#000" : "#fff"} />
    </View>
  )
}