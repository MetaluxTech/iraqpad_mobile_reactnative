import { View, Text, Dimensions, FlatList, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, Button } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
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

  const fetchData = useCallback(() => {
    // Get Stories From Api
    axios.get('https://www.iraqpad.com/api/story?order=created_at').then((response) => {
      const publishedStories = response.data.allStories.filter(story => story.status === 'Published').sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setStories(publishedStories);
      setIsLoading(false)
    });
  },[stories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // Get story that is slider From Api
  const sliders = useCallback(() => {
    const sliders = stories.filter(story => story.slider === true && story.status === 'Published');
    setSliderImage(sliders)
  },[stories]);

  useEffect(() => {
    sliders();
  }, [stories, sliders])

  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center dark:bg-black'>
        <ActivityIndicator size={'large'} color={'red'} />
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
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </View>
  )
}