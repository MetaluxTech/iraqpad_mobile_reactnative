import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React, { memo, useCallback, useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const { height, width } = Dimensions.get('window')

export default function Card({ stories }) {
    const renderItem = useCallback(({ item }) => <ItemCard item={item} />, []);
    return (
        <View className='mt-4 mb-3 flex-row '>
            <FlatList
                horizontal
                inverted={true}
                initialNumToRender={2}
                showsHorizontalScrollIndicator={false}
                data={stories}
                keyExtractor={(item) => (item.id)}
                renderItem={renderItem}
            />
        </View>
    )
}
const ItemCard = memo(({ item }) => {
    const nameAuthor = item.author.name;
    const titleStory = item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title;
    return (
        <View style={{ width: width * 0.60 }} className=" ml-2 bg-white dark:bg-blackdark rounded-lg ">
            <TouchableOpacity
                onPress={() => router.push({
                    pathname: '/story',
                    params: { id: item.id, created_at: item.created_at }
                })}
            >
                {/* Image */}
                <View className='relative '>
                    <Image
                        className=" rounded-lg "
                        source={{ uri: item.picture }}
                        containerStyle={{ borderRadius: 10, flex: 1 }}
                        style={{ resizeMode: 'cover', width: "100%", height: height * 0.40 }}
                    />
                    <LinearGradient
                        className="absolute rounded-lg bottom-0 w-full h-full"
                        colors={['transparent', 'rgba(255,0,0,5)']}
                    />
                </View>
                {/* <View className="absolute top-2 left-2 flex-row shadow justify-center items-center bg-white py-1 px-2 rounded-lg">
                    <Text className='text-black mr-1'>{item.rate}</Text>
                    <Ionicons name='star' size={20} color={'yellow'}/>
                </View> */}
                {/* Content */}
                <View className="absolute w-full bottom-3 right-0  px-2 flex-col justify-center items-end ">
                    <Text className="text-lg text-right font-cairoBold text-white mb-0">{titleStory}</Text>
                    <Text className="text-white text-sm  font-cairoLight text-right">
                        للكاتب {nameAuthor}
                    </Text>
                    <View className='flex-row-reverse  justify-center mt-2 w-full items-center'>
                        <Text className="text-white p-1   rounded-sm shadow-md bg-[#015f88] font-cairoMedium text-right">
                            {item.category.title}
                        </Text>
                        <Text className="text-white mr-2 p-1 rounded-sm shadow-md bg-[#014d6e] font-cairoMedium text-right">
                            {item.subcategory.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
})