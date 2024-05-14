import { View, Text, Image, StatusBar, ScrollView, Modal, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../common/ThemeProvider';
import axios from 'axios';

export default function index() {
  const { colorScheme, setActivePart, activePartId } = useContext(ThemeContext)
  const { title, picture, description, storyId } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [part, setPart] = useState([])
  // Get part Of Story From Api
  useEffect(() => {
    axios.get(`https://iraqpad-web.vercel.app/api/part?storyId=${storyId}`).then((response) => {
      const partsForStory = response.data.allParts.filter(part => part.storyId === storyId);
      setPart(partsForStory);
    });
  }, [])
  return (
    <View className='flex-1 dark:bg-black' >
      <ScrollView >
        {/* Image */}
        <View className='relative'>
          <Image
            className="h-[250] w-full"
            source={{ uri: picture }}
            resizeMode='cover'
          />
          <LinearGradient
            className="absolute bottom-0 w-full h-full"
            colors={['transparent', 'rgba(0,0,0,0.9)']}
          />
          {/* Back Btn */}
          <TouchableOpacity
            className="absolute top-12 z-10 left-5 bg-white p-3 rounded-full "
            onPress={() => router.back()}
          >
            <Icon
              className=" "
              name='arrow-back-outline'
              size={20}
              color={'red'}
            />
          </TouchableOpacity>
        </View>
        {/* Content */}
        <View className="px-4 py-5 mt-5  mx-2 flex-1">
          <Text className="text-2xl  font-cairoBold text-black dark:text-white mb-3 pt-4 text-right">{title}</Text>
          <Text className="text-lg  text-darkgray dark:text-whitegray font-cairoMedium text-right">{description}</Text>
        </View>
        {/* Bottom Content */}
        <View className='flex-row items-center justify-between py-2 px-4 w-full bg-white shadow-sm rounded-t-[30px] dark:bg-black'>
          <TouchableOpacity className='p-3 ' onPress={() => setModalVisible(true)}>
            <Text className='font-cairoRegular text-md text-secondary '>عرض الفصول</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-3 '
            onPress={() => router.back()}>
            <Text className='font-cairoRegular text-md text-secondary '>رجوع</Text>
          </TouchableOpacity>
        </View>
        {/* Modal To Display The Parts Of this Story */}
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View className="bg-white dark:bg-[#111] shadow-sm rounded-t-[30px] pt-5 h-[90vh] absolute bottom-0">
            <View className=' px-4 mt-2 w-full flex-row-reverse justify-between items-center h-[40px] '>
              <Text className="text-xl text-right font-cairoBold text-black dark:text-white ">كل الفصول</Text>
              <TouchableOpacity className='border border-[#333] dark:border-[#585757] rounded-full p-2 ' onPress={() => setModalVisible(false)}>
                <Icon name={'arrow-back-outline'} size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
              </TouchableOpacity>
            </View>
            <View className="py-3 px-3 mt-3">
              <FlatList
                data={part}
                inverted={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <PartStory
                    item={item}
                    activePartId={activePartId}
                    setActivePart={setActivePart}
                  />
                )}
                firstItem={1}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} backgroundColor={colorScheme == "dark" ? "#000" : "#fff"} />
    </View>
  )
}

const PartStory = ({ item, activePartId, setActivePart }) => {
  const isActive = item.id === activePartId;
  return (
    <View className="pb-2 ">
      <TouchableOpacity
        onPress={() => {
          setActivePart(item.id);
          router.push({
            pathname: '/partstory',
            params: item
          })
        }}
      >
        <Text className={isActive ? 'text-red text-right  font-cairoRegular' : 'text-black dark:text-white text-right  font-cairoRegular'}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )
}