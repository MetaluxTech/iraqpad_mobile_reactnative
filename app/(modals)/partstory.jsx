import { View, Text, Image, StatusBar, FlatList, Dimensions, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import React, { memo, useContext, useEffect, useState, useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import HTML from 'react-native-render-html';
import { ThemeContext } from '../../common/ThemeProvider';

const { width } = Dimensions.get('window');

export default function Page() {
  const { colorScheme, setActivePart, activePartId, setActiveModalPart, activeModalPart, setActiveModalPartStory } = useContext(ThemeContext);
  const { id, storyId } = useLocalSearchParams();

  const [part, setPart] = useState([]);
  const [singlePart, setSinglePart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('id:' + id)
  console.log(singlePart)
  useEffect(() => {
    axios.get(`https://www.iraqpad.com/api/part?storyId=${storyId}`).then((response) => {
      const partsForStory = response.data.allParts.filter(part => part.storyId === storyId);
      setPart(partsForStory);
      setIsLoading(false);
    });
  }, [storyId]);

  useEffect(() => {
    if (part.length > 0) {
      const filteredPart = part.filter(p => p.id === id);
      setSinglePart(filteredPart);
    }
  }, [part, id]);

  const handlePartPress = useCallback((partId, storyId) => {
    setActivePart(partId);
    setActiveModalPart(false);
    router.push({
      pathname: '/partstory',
      params: { storyId: storyId, id: partId }
    });
  }, [setActivePart, setActiveModalPart]);

  const handleBackPress = useCallback(() => {
    router.navigate('/');
    setActiveModalPart(false);
    setActiveModalPartStory(false);
  }, [setActiveModalPart, setActiveModalPartStory]);
  const handleBackToStoryPress = useCallback((storyId) => {
    router.push({
      pathname: '/story',
      params: { id: storyId }
    });
    setActiveModalPart(false);
    setActiveModalPartStory(false);
  }, [setActiveModalPart, setActiveModalPartStory])
  if (isLoading) {
    return (
      <View className='flex-1 w-full h-full justify-center items-center dark:bg-black'>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  }

  return (
    <View className='flex-1 dark:bg-black'>
      <FlatList
        data={singlePart}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={2}
        renderItem={({ item }) => (
          <PartPage
            item={item}
            colorScheme={colorScheme}
            storyId={storyId}

            handleBackToStoryPress={handleBackToStoryPress}
          />
        )}
      />
      <View style={{ flex: 1 }} />
      {part && (
        <View className='flex-row items-center justify-between py-2 px-4 w-full bg-white shadow-sm rounded-t-[30px] dark:bg-black'>
          <TouchableOpacity className='p-3' onPress={() => setActiveModalPart(true)}>
            <Text className='font-cairoRegular text-md text-secondary'>عرض الفصول</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-3' onPress={handleBackPress}>
            <Text className='font-cairoRegular text-md text-secondary'>الصفحة الرئيسية</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal transparent={true} visible={activeModalPart} animationType="slide">
        <View className="bg-white dark:bg-[#111] shadow-sm rounded-t-[30px] pt-5 h-[90vh] absolute bottom-0">
          <View className='px-4 mt-2 w-full flex-row-reverse justify-between items-center h-[40px]'>
            <Text className="text-xl text-right font-cairoBold text-black dark:text-white">كل الفصول</Text>
            <TouchableOpacity className='border border-[#333] dark:border-[#585757] rounded-full p-2' onPress={() => setActiveModalPart(false)}>
              <Icon name={'close-outline'} size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
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
                  activePartId={activePartId}
                  handlePartPress={handlePartPress}
                />
              )}
            />
          </View>
        </View>
      </Modal>
      <StatusBar style={colorScheme == 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

const PartStory = memo(({ item, activePartId, handlePartPress }) => {
  const isActive = item.id === activePartId;

  return (
    <View className="mb-3">
      <TouchableOpacity
        className="bg-secondary w-full py-3 px-6 flex-row justify-center items-center rounded-md shadow"
        onPress={() => handlePartPress(item.id, item.storyId)}
      >
        <Text className={isActive ? 'text-white font-cairoRegular' : 'text-black font-cairoRegular'}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
});

const PartPage = memo(({ item, colorScheme, handleBackToStoryPress, storyId }) => {
  return (
    <View>
      <View className='relative'>
        <Image
          className="h-[250] w-full"
          source={{ uri: item.picture }}
          resizeMode='cover'
        />
        <LinearGradient
          className="absolute bottom-0 w-full h-full"
          colors={['transparent', 'rgba(0,0,0,0.9)']}
        />
        <TouchableOpacity
          className="absolute top-12 z-10 left-5 bg-white p-3 rounded-full"
          onPress={() => {
            handleBackToStoryPress(storyId)
          }}
        >
          <Icon
            name='arrow-back-outline'
            size={20}
            color={'red'}
          />
        </TouchableOpacity>
      </View>
      <View className="px-4 py-5 mb-4">
        <Text className="text-2xl font-cairoBold text-black dark:text-white mb-3 pt-4 text-right">{item.title}</Text>
        <HTML
          contentWidth={width}
          source={{ html: item.description }}
          baseStyle={{ color: colorScheme === 'dark' ? '#EDEDED' : '#808080' }}
        />
      </View>
    </View>
  );
});