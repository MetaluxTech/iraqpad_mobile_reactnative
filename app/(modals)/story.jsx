import { View, Text, StatusBar, FlatList, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import axios from 'axios';
import { ThemeContext } from '../../common/ThemeProvider';
import StoryPage from '../../components/StoryPage';


export default function page() {
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn } = useAuth()
  const [addFavorite, setAddFavorite] = useState(false);
  const [addLike, setAddLike] = useState(false);
  const [part, setPart] = useState([]);
  const [story, setStory] = useState([]);
  const [activeComment, setActiveComment] = useState(false);
  const { colorScheme, setActivePart, setActiveModalPartStory, activeModalPartStory, setActiveModalPart } = useContext(ThemeContext)
  const { id } = useLocalSearchParams();

  // Get part Of Story From Api
  useEffect(() => {
    axios.get(`https://www.iraqpad.com/api/story?order=created_at?id=${id}`).then((response) => {
      const stories = response.data.allStories.filter(story => story.id === id);
      setStory(stories);
    });
  }, [id])
  useEffect(() => {
    axios.get(`https://www.iraqpad.com/api/part?order=created_at?storyId=${id}`).then((response) => {
      const partsOfStory = response.data.allParts.filter(part => part.storyId === id);
      setPart(partsOfStory);
      setIsLoading(false)
    });
  }, [id])
  const renderStoryItem = useCallback(({ item }) => (
    <StoryPage
      item={item}
      part={part}
      setActiveModalPart={setActiveModalPart}
      colorScheme={colorScheme}
      setActiveModalPartStory={setActiveModalPartStory}
    />
  ), [part, setActiveModalPart, colorScheme, setActiveModalPartStory]);

  const renderPartItem = useCallback(({ item }) => (
    <PartStory
      item={item}
      setActiveModalPart={setActiveModalPart}
      setActiveModalPartStory={setActiveModalPartStory}
      setActivePart={setActivePart}
    />
  ), [setActiveModalPart, setActiveModalPartStory, setActivePart]);

  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center dark:bg-black'>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    )
  }
  return (
    <View className='flex-1 dark:bg-black z-10'>
      <FlatList
        data={story}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={2}
        renderItem={renderStoryItem}
      />
      {/* Make Space Between Description And Comment System */}
      <View style={{ flex: 1 }} />
      {/* Like And Comment System */}
      {/* <View className='bg-slate-200  rounded-lg  p-4 w-full flex-row-reverse items-center justify-between'>
        <TouchableOpacity
          onPress={() => setAddLike(!addLike)}
          className='flex-row justify-end  w-1/3'>
          <Icon
            className=" "
            name={addLike ? 'heart' : 'heart-outline'}
            size={25}
            color={'red'}
          />
        </TouchableOpacity>
        <Pressable className='w-1/3 ' onPress={() => { setActiveComment(true) }}>
          <Text className='text-center text-md font-cairoMedium'>تعليق</Text>
        </Pressable>
        <TouchableOpacity className='flex-row justify-start  w-1/3'>
          <Icon
            className=""
            name='arrow-redo-outline'
            size={25}
            color={'red'}
          />
        </TouchableOpacity>
      </View> */}
      {/* Modal Comment */}
      {/* <Modal transparent={true} visible={activeComment} animationType="slide">
        <View className="bg-white dark:bg-[#111] shadow-sm rounded-t-[30px] pt-5 h-[90vh] w-full absolute bottom-0">
          <View className=' px-4 mt-2 w-full flex-row-reverse justify-between items-center h-[40px] '>
            <Text className="text-xl text-right font-cairoBold text-black dark:text-white ">التعليقات</Text>
            <TouchableOpacity className='border border-[#333] dark:border-[#585757] rounded-full p-2 ' onPress={() => setActiveComment(false)}>
              <Icon name={'close-outline'} size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {/* Modal To Display The Parts Of this Story */}
      <Modal transparent={true} visible={activeModalPartStory} animationType="slide">
        <View className="bg-white dark:bg-[#111] shadow-sm rounded-t-[30] pt-5 h-[90vh] absolute bottom-0">
          <View className=' px-4 mt-2 w-full flex-row-reverse justify-between items-center h-[40px] '>
            <Text className="text-xl text-right font-cairoBold text-black dark:text-white ">كل الفصول</Text>
            <TouchableOpacity className='border border-[#333] dark:border-[#585757] rounded-full p-2 ' onPress={() => setActiveModalPartStory(false)}>
              <Icon name={'close-outline'} size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>
          <View className="py-3 px-3 mt-5 mb-10">
            <FlatList
              data={part}
              inverted={false}
              keyExtractor={item => item.id}
              initialNumToRender={7}
              renderItem={renderPartItem}
            />
          </View>
        </View>
      </Modal>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
    </View>
  )
}

const PartStory = memo(({ item, setActivePart, setActiveModalPartStory, setActiveModalPart }) => {

  return (
    <View className="mb-3 ">
      <TouchableOpacity
        className="bg-secondary w-full py-3 px-6 flex-row justify-center items-center rounded-md shadow"
        onPress={() => {
          
          setActivePart(item.id);
          setActiveModalPartStory(false)
          setActiveModalPart(false)
          router.push({
            pathname: '/partstory',
            params: { storyId: item.storyId ,id:item.id}
          })
        }}
      >
        <Text className='text-white font-cairoRegular'>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )
})
