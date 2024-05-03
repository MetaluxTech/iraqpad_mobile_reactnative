import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router } from 'expo-router';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../common/ThemeProvider';
export default function categoriesModals() {
    const { colorScheme } = useContext(ThemeContext)
    const [categories, SetCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Get Categories From Api
        axios.get('https://iraqpad-web.vercel.app/api/category').then((response) => {
            SetCategories(response.data)
            setIsLoading(false)
        });
    }, [])
    if (isLoading) {
        return (
            <View className='flex-1 w-full h-full justify-center items-center'>
                <ActivityIndicator size={'large'} color={'red'} />
                <Text className='font-cairoRegular text-black  text-center w-full'>يتم تحميل الفئات ...</Text>
            </View>
        )
    }
    return (
        <View className="shadow-lg bg-slate-200 dark:bg-black flex-1 pt-5">
            <View className='px-4 mb-10 mt-5 w-full flex-row-reverse justify-between items-center h-[50]'>
                {/* Title Of Category */}
                <Text className='text-xl text-black font-cairoBold dark:text-white'>كل الفئات</Text>
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
            <View className="py-5 px-3 bg-white dark:bg-[#111] flex-1 mt-5 shadow-sm rounded-t-[30px]">
                <Text className=" font-cairoBold pr-2 text-lg text-right text-black dark:text-white">اختر فئة</Text>
                <View className="border-b border-darkgray dark:border-whitegray mb-4 mt-4" />
                <FlatList
                    data={categories}
                    inverted={false}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicators={false}
                    renderItem={showCategoy}
                    firstItem={-1}
                    numColumns={4}
                    columnWrapperStyle={{ justifyContent: 'center', flexDirection: 'row-reverse' }}
                />
            </View>
        </View>
    )
}
const showCategoy = ({ item }) => {
    return (
        <View>
            <TouchableOpacity
                className="border-secondary border   px-6 py-3 rounded-md mx-2"
                onPress={() => router.push({
                    pathname: '/storyByCategory',
                    params: item
                })}
            >
                <Text className="font-cairoMedium text-secondary ">{item.title}</Text>
            </TouchableOpacity>
        </View>
    )
}