import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React, { useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const { height, width } = Dimensions.get('window')

export default function Card({stories}) {
    // data =stories;
    return (
        <View className='mt-4 mb-3 '>
            <FlatList
                horizontal
                inverted={true}
                showsHorizontalScrollIndicator={false}
                data={stories}
                keyExtractor={(item)=>(item.id)}
                renderItem={ItemCard}
                firstItem={1}
            />
        </View>
    )
}
const ItemCard= ({item })=>{
    return(
        <View className=" ml-2 bg-white dark:bg-blackdark rounded-lg p-2">
            <TouchableOpacity
                onPress={()=>router.push({
                    pathname: '/story',
                    params: item
                })}
            >
                {/* Image */}
                <View className='relative'>
                    <Image
                        className=" rounded-lg"
                        source={item.image}
                        containerStyle={{borderRadius:10,flex:1}}
                        style={{resizeMode:'cover' , width:width*0.42 ,height:height*0.25}}
                    />
                </View>
                <View className="absolute top-2 left-2 flex-row shadow justify-center items-center bg-white py-1 px-2 rounded-lg">
                    <Text className='text-black mr-1'>{item.rate}</Text>
                    <Ionicons name='star' size={20} color={'yellow'}/>
                </View>
                {/* Content */}
                <View className="py-3 px-1 ">
                    <Text className="text-lg font-cairoMedium dark:text-white">{item.title}</Text>
                    {/* Description I believe is not necessary */}
                    <Text className="text-darkgray dark:text-whitegray mb-2 font-cairoLight">{item.description.length >= 20 && item.description.slice(0,15)+'...'}</Text>
                    <Text className="text-darkgray dark:text-whitegray font-cairoLight">الكاتب : <Text className="text-[#444] dark:text-white font-cairoMedium">{item.author}</Text></Text>
                    <Text className="text-darkgray dark:text-whitegray font-cairoLight">الفئة : <Text className="text-secondary font-cairoMedium">{item.categories}</Text></Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}