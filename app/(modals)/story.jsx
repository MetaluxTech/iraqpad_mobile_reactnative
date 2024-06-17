import { View, Text, Image, StatusBar, FlatList, ScrollView, Dimensions, Modal } from 'react-native'
import React, { memo, useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Alert } from 'react-native';
import axios from 'axios';
import { ThemeContext } from '../../common/ThemeProvider';
import RenderHtml from 'react-native-render-html';
const { width } = Dimensions.get('window')
export default function index() {
  const { isSignedIn } = useAuth()
  const [addFavorite, setAddFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { title, picture, description, id, created_at } = useLocalSearchParams();
  // Get The Date Of Punlish This Story
  const dateObject = new Date(created_at);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  const [part, setPart] = useState([]);

  const { colorScheme, setActivePart } = useContext(ThemeContext)
  // Get part Of Story From Api
  useEffect(() => {
    axios.get(`https://www.iraqpad.com/api/part?order=created_at?storyId=${id}`).then((response) => {
      const partsOfStory = response.data.allParts.filter(part => part.storyId === id);
      setPart(partsOfStory);
    });
  }, [])
  return (
    <View className='flex-1 dark:bg-black '>
      <ScrollView>
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
          <View className="absolute bottom-4 right-3 flex-row-reverse justify-between px-4 w-full">
            {/* <Text 
            className=" text-white py-4 text-right text-2xl font-cairoBold "
          >
            {title}
          </Text> */}
            {/* <View className='flex-row items-center '>
            <Text className='text-white text-lg mr-2'>{rate}</Text>
            <Icon 
              className="" 
              name='star' 
              size={25} 
              color={'yellow'}
            />
          </View> */}
          </View>
          <View className="absolute top-12 left-0 z-50 px-4 flex-row justify-between w-full">
            {/* Back */}
            <TouchableOpacity
              className="bg-white p-3 rounded-full"
              onPress={() => router.back()}
            >
              <Icon
                className=" "
                name='arrow-back-outline'
                size={20}
                color={'red'}
              />
            </TouchableOpacity>
            {/* Parts */}
            <TouchableOpacity
              className="bg-white p-3 rounded-full"
              onPress={() => setModalVisible(true)}
            >
              <Icon
                className=" "
                name='grid-outline'
                size={20}
                color={'red'}
              />
            </TouchableOpacity>
            {/* favorite */}
            {/* <TouchableOpacity
            onPress={()=>(
              isSignedIn 
              ? setAddFavorite(!addFavorite) 
              :Alert.alert('تنبيه...','يرجى تسجيل الدخول',[
                {text :'cancel'},
                {text :'login',onPress:()=>router.push('(modals)/login')}
              ])
              )}
          >
            <Icon 
              className=" bg-white p-3 rounded-full" 
              name={addFavorite ?'heart':'heart-outline'}  
              size={20} 
              color={'red'}
            />
          </TouchableOpacity> */}
          </View>
        </View>
        {/* Parts */}
        {/* {part.length > 0 && <View className="py-3 px-3 ">
          <Text className="text-2xl text-right font-cairoBold text-black dark:text-white mb-3 mt-5">الفصول</Text>
          <FlatList
            data={part}
            inverted={true}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicators={false}
            renderItem={({ item }) => (
              <PartStory
                item={item}
                setActivePart={setActivePart}
              />
            )}
            firstItem={1}
          />
        </View>} */}
        {/* Content */}
        <View className="px-4 py-5  dark:bg-black mx-2 ">
          <Text className="text-2xl font-cairoRegular text-black text-right dark:text-white mb-2">{title}</Text>
          {/* Info Of Story */}
          <View className='my-2 '>
            <Text className='text-sm font-cairoLight text-darkgray text-right dark:text-whitegray'>تم النشر بتاريخ: {formattedDate}</Text>
          </View>
          <RenderHtml
            contentWidth={width}
            source={{ html: description }}
            baseStyle={{ color: colorScheme === 'dark' ? '#EDEDED' : '#808080' }}
          />
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
            <View className="py-3 px-3 mt-5 mb-10">
              <FlatList
                data={part}
                inverted={false}
                keyExtractor={item => item.id}
                initialNumToRender={7}
                renderItem={({ item }) => (
                  <PartStory
                    item={item}
                    setActivePart={setActivePart}
                  />
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} backgroundColor={colorScheme == "dark" ? "#000" : "#fff"} />
    </View>
  )
}
const PartStory = memo(({ item, setActivePart }) => {
  return (
    <View className="mb-3 ">
      <TouchableOpacity
        className="bg-secondary w-full py-3 px-6 flex-row justify-center items-center rounded-md shadow"
        onPress={() => {
          setActivePart(item.id);
          router.push({
            pathname: '/partstory',
            params: item
          })
        }}
      >
        <Text className='text-white font-cairoRegular'>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )
})