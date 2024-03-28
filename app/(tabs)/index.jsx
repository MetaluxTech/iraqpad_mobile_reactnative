import { View, Text, Dimensions, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { subcategory, image , maincategory, newstories, beststories} from '../../common/data'
import SliderImage from '../../components/SliderImage'
import Card from '../../components/Card'
import {router, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind'
const { height, width } = Dimensions.get('window')
export default function home() {
  
  return (
      <View className="flex-1 bg-slate-100 dark:bg-black">
        
        <Header/>
        <ScrollView>
          {/* Slider Section */}
          <SliderImage image={image}/>
          {/* Categories Section */}
          <View className="my-4 mx-2 py-5 bg-white dark:bg-blackdark shadow rounded-lg">
            {/* Main Categories */}
            <View className=" px-10 mb-5">
              <FlatList
                horizontal
                inverted={true}
                showsHorizontalScrollIndicator={false}
                data={maincategory}
                keyExtractor={(item)=>(item.id)}
                renderItem={({item})=>{
                  return(
                    <TouchableOpacity>
                      <Text 
                        className="font-cairoMedium border-secondary border shadow-2xl text-secondary  px-6 py-3 rounded-md mx-2">
                        {item.name}
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
              keyExtractor={(item)=>(item.id)}
              renderItem={({item})=>{
                return(
                  <TouchableOpacity>
                    <Text 
                      className="font-cairoRegular bg-secondary text-white  px-4 py-2 rounded-md mr-2">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  )}}
            />
          </View>
          {/* New Stories */}
          <View className=" px-2 my-4 mx-1">
            <Text className="text-xl font-cairoBold dark:text-whitegray">المضافة حديثاً</Text>
            {/* Best Stories slider */}
            <Card stories={beststories}/>
          </View>
          {/* Best Stories */}
          <View className=" px-2 my-4 mx-1">
            <Text className=" text-xl font-cairoBold dark:text-whitegray">أفضل القصص</Text>
            {/* Best Stories slider */}
            <Card stories={newstories}/>
          </View>
        </ScrollView>
        
      </View>
  )
}