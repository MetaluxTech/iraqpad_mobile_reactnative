import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const { height, width } = Dimensions.get('window')

export default function CardByCategory({story}) {
    
    return (
        <View className='mt-2 mb-3 flex-row '>
            <FlatList
                data={story}
                inverted={false}
                keyExtractor={item => item.id}
                renderItem={ItemCard}
                firstItem={1}
            />
        </View>
    )
}
const ItemCard= ({item })=>{
    // Choose First Name Of Author
    const nameAuthor =item.author.name.split(" ");
    const titleStory =item.title.length >12 ?item.title.slice(0, 12)+'...' :item.title;
    return(
        <View className="  ml-2 mb-2 bg-white dark:bg-blackdark rounded-lg p-2">
            <TouchableOpacity
                className="flex-row-reverse"
                onPress={()=>router.push({
                    pathname: '/story',
                    params: item
                })}
            >
                {/* Image */}
                <View className='relative w-1/2 flex items-center justify-center'>
                    <Image
                        className=" rounded-lg "
                        source={{uri: item.picture}}
                        containerStyle={{borderRadius:10,flex:1}}
                        style={{resizeMode:'cover' , width:'100%' ,height:height*0.20}}
                    />
                </View>
                {/* <View className="absolute top-2 left-2 flex-row shadow justify-center items-center bg-white py-1 px-2 rounded-lg">
                    <Text className='text-black mr-1'>{item.rate}</Text>
                    <Ionicons name='star' size={20} color={'yellow'}/>
                </View> */}
                {/* Content */}
                
                <View className="py-3 px-2  w-1/2 flex-col justify-center items-end">
                    <Text className="text-lg text-right font-cairoMedium dark:text-white">{titleStory}</Text>
                    <Text className="text-darkgray dark:text-whitegray text-right font-cairoLight">الكاتب : <Text className="text-[#444] dark:text-white font-cairoMedium text-right">{nameAuthor[0]}</Text></Text>
                    <Text className="text-darkgray dark:text-whitegray text-right font-cairoLight">الفئة : <Text className="text-secondary font-cairoMedium text-right">{item.category.title}</Text></Text>
                    <Text className="text-darkgray dark:text-whitegray text-right font-cairoLight">التصنيف : <Text className="text-secondary font-cairoMedium text-right">{item.subcategory.title}</Text></Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}