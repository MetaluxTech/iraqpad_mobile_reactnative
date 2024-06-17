import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React, { useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const { height, width } = Dimensions.get('window')

export default function Card({stories}) {
    
    return (
        <View className='mt-4 mb-3 flex-row '>
            <FlatList
                horizontal
                inverted={true}
                initialNumToRender={2}
                showsHorizontalScrollIndicator={false}
                data={stories}
                keyExtractor={(item)=>(item.id)}
                renderItem={ItemCard}
            />
        </View>
    )
}
const ItemCard= ({item })=>{
    const nameAuthor =item.author.name.split(" ");
    const titleStory =item.title.length >15 ?item.title.slice(0, 15)+'...' :item.title;
    return(
        <View style={{width:width*0.50}} className=" ml-2 bg-white dark:bg-blackdark rounded-lg p-2">
            <TouchableOpacity
                onPress={()=>router.push({
                    
                    pathname: '/story',
                    params: item
                })}
            >
                {/* Image */}
                <View className='relative'>
                    <Image
                        className=" rounded-lg "
                        source={{uri: item.picture}}
                        containerStyle={{borderRadius:10,flex:1}}
                        style={{resizeMode:'cover' , width:"100%" ,height:height*0.30}}
                    />
                </View>
                {/* <View className="absolute top-2 left-2 flex-row shadow justify-center items-center bg-white py-1 px-2 rounded-lg">
                    <Text className='text-black mr-1'>{item.rate}</Text>
                    <Ionicons name='star' size={20} color={'yellow'}/>
                </View> */}
                {/* Content */}
                <View className="py-3 px-2  flex-col justify-center items-end ">
                    <Text className="text-lg text-right font-cairoMedium dark:text-white">{titleStory}</Text>
                    <Text className="text-darkgray dark:text-whitegray text-right font-cairoLight">الكاتب : <Text className="text-[#444] dark:text-white font-cairoMedium text-right">{nameAuthor[0]}</Text></Text>
                    <Text className="text-darkgray dark:text-whitegray text-right font-cairoLight">الفئة : <Text className="text-secondary font-cairoMedium text-right">{item.category.title}</Text></Text>
                    <Text className="text-darkgray dark:text-whitegray text-right font-cairoLight">التصنيف : <Text className="text-secondary font-cairoMedium text-right">{item.subcategory.title}</Text></Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}